// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ButtonBase, Container, Skeleton, Theme, Typography, useMediaQuery } from '@mui/material';
import logo from '../../../assets/logos/logo-green.svg';
import QRCode from 'react-qr-code';
import LoginIcon from '@mui/icons-material/Login';
import { LoadingButton } from '@mui/lab';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useMutation } from '@tanstack/react-query';
import { login } from '../../../api';
import { addSecret } from '../../../redux/reducers/login';
import { useHistory } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { io, Socket } from 'socket.io-client';
// import * as bitcoinMessage from 'bitcoinjs-message';

interface Props {
    className?: string;
}

const API_URL = 'https://bridge.codepillow.io';
const CALLBACK_URL = 'https://callback.bridge.aok.network/';
const PREFIX = '\x14AOK Signed Message:\n';
// const PREFIX = 'Bridge';

const uuid4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

const LoginForm: FC<Props> = ({ className }) => {
    const mobile = useMediaQuery(({ breakpoints }: Theme) => breakpoints.down('sm'));
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();

    const { mutate, isLoading } = useMutation(login, {
        onSuccess: (data) => {
            history.push('/');
            dispatch(addSecret(data.token));
            localStorage.setItem('auth', data.token);
            enqueueSnackbar('Login success!', { variant: 'success' });
            console.log(data);
        },
        onError: (e) => {
            alert(e);
        },
    });

    const fakeLogin = () => {
        mutate({
            signature: 'signature2',
            message: 'message2',
            address: 'aсcount2',
        });
    };

    // //
    const socket = useRef<Socket>(null);
    const [session] = useState(uuid4());
    const [message, setMessage] = useState('');
    const [QRCodeData, setQRCodeData] = useState<string>();
    const [socketData, setSocketData] = useState<{ address: string; signature: string }>();

    const onSocketCallback = useCallback(({ address, signature }) => {
        setSocketData({
            address,
            signature,
        });
    }, []);

    const getNewQRCodeData = () => {
        return `aok://sign?callback=${CALLBACK_URL}/call/${session}&message=${message}`;
    };

    const getServerInfoFromAPI = async () => {
        try {
            const {
                data: {
                    data: { time, prefix },
                },
            }: AxiosResponse<{ data: { time: string; prefix: string } }> = await axios.get(
                'https://api.seirenwar.com/v1/system/time',
            );
            // }: AxiosResponse<{ data: { time: string; prefix: string } }> = await axios.get(`${API_URL}/system/time`);
            setMessage(`${prefix}/${time}`);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        if (message) {
            setQRCodeData(getNewQRCodeData());
        }
    }, [message]);
    console.log(socketData);
    // console.log(bitcoinMessage);
    useEffect(() => {
        // if (socketData) {
        //     console.log(socketData);
        //     console.log(bitcoinMessage);
        //     if (bitcoinMessage.verify(message!, socketData.address, socketData.signature, PREFIX)) {
        //         login({
        //             address: socketData.address,
        //             message: message!,
        //             signature: socketData.signature,
        //         });
        //
        //         socket.current!.off(session, onSocketCallback);
        //     }
        // }
    }, [socketData]);

    useEffect(() => {
        // @ts-ignore
        socket.current = io(CALLBACK_URL, {
            transports: ['websocket'],
            upgrade: false,
        });
        socket.current.emit('callback', session);
        socket.current.on(session, onSocketCallback);

        getServerInfoFromAPI();

        return () => {
            // @ts-ignore
            socket.current.off(session, onSocketCallback);
        };
    }, []);
    // //

    return (
        <Container className={className} maxWidth="xs">
            <img src={logo} alt="logo" height={72} width={72} />
            <Typography variant="h4" pt={6} pl={3} color="primary">
                Sign Up
            </Typography>
            <ol>
                <li>Open AOK Wallet app. (If you dont have the wallet, download it using the link below.)</li>
                <li>Select address what you want to sign in</li>
                <li>Open QR scan</li>
            </ol>
            <div className="qr-code">
                {/*<QRCode value={'ssoremgo3gpojn3[gb34g3ss'} size={mobile ? 135 : 170} />*/}
                {QRCodeData ? (
                    <ButtonBase href={QRCodeData} target="_blank">
                        <QRCode size={174} value={QRCodeData} bgColor="white" />
                    </ButtonBase>
                ) : (
                    <div className="qr-code-skeleton">
                        <Skeleton width="100%" height="100%" variant="rectangular" />
                    </div>
                )}
            </div>
            <LoadingButton
                loading={isLoading}
                fullWidth={!mobile}
                className="link"
                variant="contained"
                startIcon={<LoginIcon />}
                onClick={fakeLogin}
            >
                <Typography textTransform="none" variant="body1">
                    I want to log in or register.
                </Typography>
            </LoadingButton>
        </Container>
    );
};

export default styled(LoginForm)`
    margin: auto;

    .qr-code {
        margin: ${({ theme }) => theme.spacing(5.5, 0)};
        padding: ${({ theme }) => theme.spacing(5.5)};
        border: ${({ theme }) => theme.palette.divider} 1px solid;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;
