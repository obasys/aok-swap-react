import React, { FC, useEffect } from 'react';
import { Deposit, History } from './layout';
import styled from 'styled-components';
import { Container, Grid, Typography } from '@mui/material';
import UserItem from './layout/UserItem';
import { useSnackbar } from 'notistack';
import ReportSuccess from '../../components/ReportSuccess';

interface Props {
    className?: string;
}

const Home: FC<Props> = ({ className }) => {
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const handleClick = () => {
            enqueueSnackbar(
                // <Typography>You just deposited 23,315.0000 SUGAR on your account</Typography>,
                <Typography>
                    You just deposited <Typography display="inline">23,315.0000 SUGAR</Typography> on your account
                </Typography>,
                {
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                    },
                    content: (key, message) => <ReportSuccess id={key} message={message} />,
                    persist: true,
                },
            );
        };
        handleClick();
    }, []);

    return (
        <div className={className}>
            <UserItem />
            <Container className={'main-container'}>
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
        padding-top: 16px;
        margin-top: 40px;
    }
`;
