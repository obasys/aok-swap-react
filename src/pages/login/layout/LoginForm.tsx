import React, { FC } from 'react';
import styled from 'styled-components';
import { Button, Container, Theme, Typography, useMediaQuery } from '@mui/material';
import logo from '../../../assets/logos/logo-white.svg';
import QRCode from 'react-qr-code';
import LoginIcon from '@mui/icons-material/Login';

interface Props {
    className?: string;
}

const LoginForm: FC<Props> = ({ className }) => {
    const mobile = useMediaQuery(({ breakpoints }: Theme) => breakpoints.down('sm'));

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
                <QRCode value={'ssoremgo3gpojn3[gb34g3ss'} size={mobile ? 135 : 170} />
            </div>
            <Button fullWidth={!mobile} variant="contained" className="login-btn" startIcon={<LoginIcon />}>
                I want to log in or register.
            </Button>
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
