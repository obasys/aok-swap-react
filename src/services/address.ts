import * as bitcoin from 'bitcoinjs-lib';
import { BIP32Interface } from 'bitcoinjs-lib';
import * as bitcoinMessage from 'bitcoinjs-message';
import * as bip39 from 'bip39';
import * as bip32 from 'bip32';
import randomBytes from 'randombytes';

export const network: bitcoin.Network = {
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

export const getAddress = (node: any, networkAddress: any) => {
    return bitcoin.payments.p2pkh({ pubkey: node.publicKey, network: networkAddress }).address!;
};

export const isAddress = (address: string) => {
    return !!(address.length <= 34 && address.match(new RegExp('[Kk][a-zA-HJ-NP-Z0-9]{33}')));
};

export const signMessage = (wif: string, message: string) => {
    const keyPair = bitcoin.ECPair.fromWIF(wif, network);
    const { privateKey } = keyPair;

    const signature = bitcoinMessage.sign(message, privateKey!, keyPair.compressed, network.messagePrefix, {
        extraEntropy: randomBytes(32),
    });
    return signature.toString('base64');
};

export const generateSeedPhrase = async (size = 12) => {
    const mnemonic = await import('../assets/mnemonics.json');
    const seedPhrase: string[] = [];
    const randomNumbers: number[] = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < size; i++) {
        // eslint-disable-next-line no-constant-condition
        while (true) {
            const num = Math.floor(Math.random() * mnemonic.words.length);

            if (!randomNumbers.includes(num)) {
                randomNumbers.push(num);
                seedPhrase.push(mnemonic.words[num]);
                break;
            }
        }
    }

    return seedPhrase;
};

export const generateAddresses = (
    seedPhrase: string,
    startIndex = 0,
    endIndex = 0,
    derive: number,
    networkAddress: any = network,
    derivePath = "m/44'/0'/0'/",
) => {
    const seed = bip39.mnemonicToSeedSync(seedPhrase);
    const root = bip32.fromSeed(seed, networkAddress);
    const branch = root.derivePath(`${derivePath}${derive}`);
    const result: AOK.Address[] = [];

    for (let i = startIndex; i <= endIndex; i++) {
        const child = branch.derive(i);
        result.push({ index: i, wif: child.toWIF(), address: getAddress(child, networkAddress) });
    }

    return result;
};

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const generateAddressesAsync = (
    seedPhrase: string,
    startIndex = 0,
    endIndex = 0,
    derive: number,
    networkAddress: any = network,
    derivePath: string = "m/44'/0'/0'/",
): Promise<AOK.Address[]> => {
    let node: BIP32Interface;

    try {
        const seed = bip39.mnemonicToSeedSync(seedPhrase);
        node = bip32.fromSeed(seed, networkAddress);
    } catch (err) {
        throw err;
        console.log(err);
    }

    const derivedNode = node.derivePath(`${derivePath}${derive}`);
    const addr: AOK.Address[] = [];

    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
        for (let i = startIndex; i <= endIndex; i++) {
            const btcNodeDerivation = derivedNode.derive(i);

            addr.push({
                index: i,
                wif: btcNodeDerivation.toWIF(),
                address: getAddress(btcNodeDerivation, networkAddress),
            });
            await sleep(1); // delaying is mandatory, otherwise it's blocking other processes...
        }

        resolve(addr);
    });
};
