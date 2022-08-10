import React, { FC } from 'react';
import styled from 'styled-components';
import { Button, Container, Grid, Typography } from '@mui/material';

interface Props {
    className?: string;
}

const UserItem: FC<Props> = ({ className }) => {
    const fakeUserName = 'Oleh Smith';
    const fakeCoin = 'sugar';
    const fakeAmount = 1234554321;

    return (
        <div className={className}>
            <Container>
                <Grid container direction="row" alignItems="center" columnSpacing={3}>
                    <Grid item md>
                        <Typography variant="body1" color="white">
                            {fakeUserName}
                        </Typography>
                        <Typography display="inline">
                            <Typography component="span" variant="h4" color="white">
                                {fakeAmount}
                            </Typography>
                            <Typography component="span" variant="h5" textTransform="uppercase" color="white">
                                {fakeCoin}
                            </Typography>
                        </Typography>
                    </Grid>
                    <Grid item md="auto" className="balance-btn">
                        <Button variant="outlined" color="inherit" className="button">
                            Balances
                        </Button>
                    </Grid>
                    <Grid item md="auto">
                        <Button disableElevation variant="contained" color="inherit" className="button">
                            Withdraw
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default styled(UserItem)`
    padding: ${({ theme }) => theme.spacing(3, 0, 5, 0)};
    background-color: ${({ theme }) => theme.palette.primary.main};

    .balance-btn {
        color: ${({ theme }) => theme.palette.common.white};
    }

    .button {
        text-transform: none;
    }
`;
