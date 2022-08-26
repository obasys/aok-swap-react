import React, { FC } from 'react';
import styled from 'styled-components';
import { Avatar, Grid, Paper, Skeleton, Theme, Typography, useMediaQuery } from '@mui/material';

interface Props {
    className?: string;
}

const UserInfoSkeleton: FC<Props> = ({ className }) => {
    const mobile = useMediaQuery(({ breakpoints }: Theme) => breakpoints.down('sm'));

    return (
        <Paper className={className} variant="outlined">
            <Grid container alignItems="center" justifyContent="space-between" columnSpacing={2} pb={mobile ? 4 : 8}>
                <Grid item container md="auto" xs={8} alignItems="center" direction="row">
                    <Skeleton variant="circular">
                        <Avatar />
                    </Skeleton>
                    <Typography variant="h6" ml={1}>
                        <Skeleton width={100} />
                    </Typography>
                </Grid>
                <Grid item md="auto" xs={4} flexDirection="row">
                    <Typography>
                        <Skeleton width={100} />
                    </Typography>
                </Grid>
            </Grid>
            <Grid container alignItems="center" justifyContent={mobile ? 'center' : 'space-between'} columnSpacing={2}>
                <Grid item sm="auto" xs={12} justifySelf="center" pb={mobile ? 4 : 0}>
                    <Skeleton height={40} width={120} />
                </Grid>
                <Grid item md="auto">
                    <Skeleton variant="rectangular" height={40} width={120} />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default styled(UserInfoSkeleton)`
    padding: ${({ theme }) => theme.spacing(4, 3)};
`;
