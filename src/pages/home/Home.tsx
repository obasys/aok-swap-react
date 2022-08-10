import React, { FC, useEffect } from 'react';
import { Deposit, History, UserItem } from './layout';
import styled from 'styled-components';
import { Container, Grid, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { ReportSuccess } from '../../components';

interface Props {
    className?: string;
}

const Home: FC<Props> = ({ className }) => {
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const handleClick = () => {
            enqueueSnackbar(<Typography>You just deposited 23,315.0000 SUGAR on your account</Typography>, {
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                },
                content: (key, message) => <ReportSuccess id={key} message={message} />,
                persist: true,
            });
        };
        handleClick();
    }, []);

    return (
        <div className={className}>
            <UserItem />
            <Container className="main-container">
                <Grid container columnSpacing={6}>
                    <Grid item md={6}>
                        <Deposit />
                    </Grid>
                    <Grid item md={6}>
                        <History />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default styled(Home)`
    .main-container {
        padding-top: ${({ theme }) => theme.spacing(2)};
        margin-top: ${({ theme }) => theme.spacing(5)};
    }
`;
