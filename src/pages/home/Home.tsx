import React, { FC } from 'react';
import { Deposit, History } from './layout';
import styled from 'styled-components';
import { Container, Grid } from '@mui/material';

interface Props {
    className?: string;
}

const Home: FC<Props> = ({ className }) => {
    return (
        <Container maxWidth="xl" className={className}>
            <Grid container>
                <Grid item md={5}>
                    <Deposit />
                </Grid>
                <Grid item md>
                    <History />
                </Grid>
            </Grid>
        </Container>
    );
};

export default styled(Home)``;
