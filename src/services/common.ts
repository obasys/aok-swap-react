// @ts-ignore
import * as aes256 from 'aes256';
import { atob } from 'js-base64';
import * as bitcoin from 'bitcoinjs-lib';
import { TransactionBuilder } from 'bitcoinjs-lib';
import { checkAddresses, getInfo, getUTXO } from '../api';
import { Transaction as BitcoinTransaction } from 'bitcoinjs-lib/types/transaction';
import { generateAddressesAsync } from './address';

const network: bitcoin.Network = {
    bip32: {
        public: 76066276,
        private: 76067358,
    },
    pubKeyHash: 0x2e,
    scriptHash: 0x6c,
    wif: 0x8f,
    messagePrefix: '\x14AOK Signed Message:\n',
    bech32: 'bc',
};

export const encryptData = (data: any, key: string) => {
    if (key) {
        return aes256.encrypt(key, data);
    }

    return null;
};

export const decryptData = (data: any, key: string) => {
    if (key) {
        return aes256.decrypt(key, data);
    }

    return null;
};

export const writeUInt64LE = (buffer: Buffer, value: any, offset: any) => {
    buffer.writeInt32LE(value & -1, offset);
    buffer.writeUInt32LE(Math.floor(value / 0x100000000), offset + 4);
    return offset + 8;
};

export const base64ToHex = (str: string) => {
    const raw = atob(str);
    let result = '';

    for (let i = 0; i < raw.length; i++) {
        const hex = raw.charCodeAt(i).toString(16);
        result += hex.length === 2 ? hex : '0' + hex;
    }

    return result.toUpperCase();
};

export const createTransactionFromAPI = async (transactionVerbose: any, walletAddresses: string[]) => {
    const token =
        transactionVerbose.inputs.find((vin: any) => vin.currency !== 'AOK') ||
        transactionVerbose.outputs.find((vin: any) => vin.currency !== 'AOK');

    const transaction: AOK.Transaction = {
        hash: transactionVerbose.txid,
        confirmations: transactionVerbose.confirmations ? transactionVerbose.confirmations : 0,
        amount: 0,
        fee: transactionVerbose.fee,
        time: 'timestamp' in transactionVerbose ? transactionVerbose.timestamp : Math.round(Date.now() / 1000),
        type: 'received',
        currency: token ? token.currency : 'AOK',
    };

    transactionVerbose.inputs.forEach((vin: any) => {
        if (transactionVerbose.coinbase) {
            transaction.from = 'coinbase';
            return;
        }

        if (walletAddresses.includes(vin.address) && vin.currency === transaction.currency) {
            transaction.amount += vin.amount;
            transaction.type = 'sent';
            transaction.from = vin.address;
        }
    });

    if (transaction.amount === 0) {
        transaction.type = 'received';

        transactionVerbose.outputs.forEach((vout: any) => {
            if (vout.currency === transaction.currency) {
                if (walletAddresses.includes(vout.address)) {
                    transaction.amount += vout.amount;
                    transaction.to = vout.address;

                    if (parseInt(vout.timelock) > 0) {
                        transaction.timelock = {
                            amount: vout.amount,
                            time: vout.timelock,
                        };
                    }
                } else if (!transactionVerbose.coinbase) {
                    transaction.from = vout.address;
                }
            }
        });
    } else {
        transactionVerbose.outputs.forEach((vout: any) => {
            if (vout.currency === transaction.currency) {
                if (walletAddresses.includes(vout.address)) {
                    transaction.amount -= vout.amount;
                    // transaction.to = vout.address;

                    if (parseInt(vout.timelock) > 0) {
                        transaction.timelock = {
                            amount: vout.amount,
                            time: vout.timelock,
                        };
                    }
                } else {
                    transaction.to = vout.address;
                }
            }
        });

        if (!('to' in transaction)) {
            transaction.to = transaction.from;
        }

        if (transaction.amount < 0) {
            transaction.type = 'received';
            transaction.amount *= -1;
        }
    }

    return transaction;
};

export const tokenOutput = (address: string, token: { name: string; amount: number }, timelock = 0) => {
    const tokenBuffer = Buffer.allocUnsafe(3 + 1 + 1 + token.name.length + 8 + 4);
    let offset = 0;

    tokenBuffer.write('alp', offset);
    offset += 3;
    tokenBuffer.write('t', offset);
    offset += 1;
    tokenBuffer.writeUInt8(token.name.length, offset);
    offset += 1;
    tokenBuffer.write(token.name, offset);
    offset += token.name.length;
    writeUInt64LE(tokenBuffer, token.amount, offset);
    offset += 8;

    if (timelock) {
        tokenBuffer.writeInt32LE(timelock, offset);
    }

    return bitcoin.script.compile([
        bitcoin.opcodes.OP_DUP,
        bitcoin.opcodes.OP_HASH160,
        // @ts-ignore
        bitcoin.address.fromBase58Check(address, network).hash,
        bitcoin.opcodes.OP_EQUALVERIFY,
        bitcoin.opcodes.OP_CHECKSIG,
        bitcoin.opcodes.OP_ALP_TOKEN,
        tokenBuffer,
        bitcoin.opcodes.OP_DROP,
    ]);
};

export const addInputs = async (
    address: string,
    amount: number,
    tx?: TransactionBuilder,
    currency = 'AOK',
    customUTXOs?: AOK.UTXO[],
    excludeUTXOs?: AOK.UTXO[],
) => {
    try {
        let utxo = customUTXOs || (await getUTXO({ address, amount: 0, token: currency }));
        let utxoAmount = 0;
        const utxos: AOK.UTXO[] = [];

        console.log('UTXO', address, utxo);

        if (excludeUTXOs) {
            utxo = utxo.filter(
                (u: AOK.UTXO) => !excludeUTXOs.some((exU) => exU.txid === u.txid && exU.index === u.index),
            );
        }

        for (let i = 0; i < utxo.length; i++) {
            if (Math.round(utxoAmount - amount) > 0) {
                break;
            }

            if (tx) {
                const decodedScript = bitcoin.script.decompile(
                    typeof utxo[i].script === 'string'
                        ? (new Buffer(utxo[i].script as string, 'hex') as Buffer)
                        : (utxo[i].script as Buffer),
                );

                if (decodedScript && decodedScript.includes(bitcoin.opcodes.OP_CHECKLOCKTIMEVERIFY)) {
                    const generalInfo = await getInfo();

                    if (Buffer.isBuffer(decodedScript[0])) {
                        if (decodedScript[0].readUIntLE(0, decodedScript[0].length) <= 50000000) {
                            tx.setLockTime(generalInfo.blocks);
                        } else {
                            tx.setLockTime(generalInfo.mediantime);
                        }
                    } else {
                        tx.setLockTime(generalInfo.blocks);
                    }

                    tx.addInput(utxo[i].txid, utxo[i].index, 0xfffffffe);
                } else {
                    tx.addInput(utxo[i].txid, utxo[i].index);
                }
            }

            utxos.push({ ...utxo[i], address });
            utxoAmount += parseInt(utxo[i].value as string);
        }

        return {
            address,
            utxos,
            amount: utxoAmount,
        };
    } catch (e) {
        console.warn('Error in addInputs()', e);
        if (e instanceof Error) throw Error(e.message);
    }
};

export const addOutput = async (
    tx: TransactionBuilder,
    address: string,
    amount: number,
    timelockDate?: number,
    currency = 'AOK',
) => {
    if (currency !== 'AOK') {
        if (timelockDate) {
            tx.addOutput(
                tokenOutput(
                    address,
                    {
                        name: currency,
                        amount,
                    },
                    timelockDate,
                ),
                0,
            );
        } else {
            tx.addOutput(
                tokenOutput(address, {
                    name: currency,
                    amount,
                }),
                0,
            );
        }
    } else if (timelockDate) {
        tx.addOutput(
            bitcoin.script.compile([
                bitcoin.script.number.encode(timelockDate),
                bitcoin.opcodes.OP_CHECKLOCKTIMEVERIFY,
                bitcoin.opcodes.OP_DROP,
                bitcoin.opcodes.OP_DUP,
                bitcoin.opcodes.OP_HASH160,
                bitcoin.address.fromBase58Check(address).hash,
                bitcoin.opcodes.OP_EQUALVERIFY,
                bitcoin.opcodes.OP_CHECKSIG,
            ]),
            amount,
        );
    } else {
        tx.addOutput(address, amount);
    }
};

export const signInput = async (
    tx: BitcoinTransaction,
    index: number,
    script: string | Buffer,
    wif: string,
    type = bitcoin.Transaction.SIGHASH_ALL,
) => {
    const signatureHash = tx.hashForSignature(
        index,
        typeof script === 'string' ? new Buffer(script, 'hex') : script,
        type,
    );
    const key = bitcoin.ECPair.fromWIF(wif, network);

    tx.setInputScript(
        index,
        bitcoin.script.compile([bitcoin.script.signature.encode(key.sign(signatureHash), type), key.publicKey]),
    );
};

export const createRawTransation = async (
    addresses: AOK.Address[],
    depositAddress: string,
    withdrawAddress: string,
    amount: number,
    fee: number,
    timelock?: number,
    currency: string = 'AOK',
) => {
    const walletAddresses: string[] = [...new Set(addresses.map((address: any) => address.address))];
    const txb = new bitcoin.TransactionBuilder(network);
    const timestamp = Math.floor(Date.now() / 1000);
    const addedTokenUTXOs: AOK.AddedUTXO[] = [];
    const addedCoinUTXOs: AOK.AddedUTXO[] = [];
    let tokenOutputSum = 0;
    let coinOutputSum = 0;

    txb.setVersion(1);
    txb.setTimestamp(timestamp);

    try {
        if (currency !== 'AOK') {
            for (let i = 0; i < walletAddresses.length; i++) {
                if (addedTokenUTXOs.reduce((prev, curr) => prev + curr.amount, 0) >= amount) {
                    break;
                }

                addedTokenUTXOs.push((await addInputs(walletAddresses[i], amount, txb, currency))!);
            }

            for (let i = 0; i < walletAddresses.length; i++) {
                addedCoinUTXOs.push((await addInputs(walletAddresses[i], fee, txb))!);

                if (addedCoinUTXOs.reduce((prev, curr) => prev + curr.amount, 0) >= fee) {
                    break;
                }
            }
        } else {
            for (let i = 0; i < walletAddresses.length; i++) {
                addedCoinUTXOs.push((await addInputs(walletAddresses[i], amount + fee, txb))!);

                if (addedCoinUTXOs.reduce((prev, curr) => prev + curr.amount, 0) >= amount + fee) {
                    break;
                }
            }
        }

        coinOutputSum = addedCoinUTXOs.reduce((prev, curr) => prev + curr.amount, 0);
        tokenOutputSum = addedTokenUTXOs.reduce((prev, curr) => prev + curr.amount, 0);

        if (coinOutputSum < fee) {
            throw Error('Output amount error. No available UTXO for spending.');
        }

        if (currency !== 'AOK') {
            if (tokenOutputSum > amount) {
                await addOutput(txb, depositAddress, tokenOutputSum - amount, undefined, currency);
            }

            await addOutput(txb, withdrawAddress, amount, timelock, currency);

            if (coinOutputSum > fee) {
                await addOutput(txb, depositAddress, coinOutputSum - fee);
            }
        } else {
            if (coinOutputSum > amount + fee) {
                await addOutput(txb, depositAddress, coinOutputSum - amount - fee);
            }

            await addOutput(txb, withdrawAddress, amount, timelock);
        }

        const tx = txb.buildIncomplete();

        console.log('TX BUILT', tx);

        for (let i = 0; i < addedTokenUTXOs.length; i++) {
            const wif = addresses.find((a) => a.address === addedTokenUTXOs[i].address)!.wif;

            for (let k = 0; k < addedTokenUTXOs[i].utxos.length; k++) {
                await signInput(tx, i + k, addedTokenUTXOs[i].utxos[k].script, wif);
            }
        }

        const tokenUTXOsLen = addedTokenUTXOs.reduce((prev, curr) => prev + curr.utxos.length, 0);

        for (let i = 0; i < addedCoinUTXOs.length; i++) {
            const wif = addresses.find((a) => a.address === addedCoinUTXOs[i].address)!.wif;

            for (let k = 0; k < addedCoinUTXOs[i].utxos.length; k++) {
                await signInput(tx, i + k + tokenUTXOsLen, addedCoinUTXOs[i].utxos[k].script, wif);
            }
        }

        const txHex = tx.toHex();
        console.log('RAW TX', txHex);

        return txHex;
    } catch (e) {
        console.warn('Error in sendTransaction()');

        if (e instanceof Error) throw Error(e.message);
    }
};

export const findAddresses = async (seedPhrase: string[]) => {
    let addressesWithHistory: AOK.Address[] = [];
    let synced = false;
    const offset = 20;
    const searchRange = [0, offset];

    while (!synced) {
        let addresses;

        try {
            addresses = await generateAddressesAsync(seedPhrase.join(' '), searchRange[0], searchRange[1], 0);
        } catch (e) {
            throw e;
        }

        addressesWithHistory = [...addressesWithHistory, addresses[0]];

        const filteredAddresses = await checkAddresses({ addresses });

        if (filteredAddresses.length > 0) {
            addressesWithHistory = [
                ...addressesWithHistory,
                ...addresses.filter((address) => filteredAddresses.includes(address.address)),
            ];
            searchRange[0] += offset;
            searchRange[1] += offset;
        } else {
            synced = true;
        }
    }

    return [...new Set(addressesWithHistory)];
};
