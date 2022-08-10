import React, { FC } from 'react';
import styled from 'styled-components';
import { Chip, Grid, ListItemButton, Typography } from '@mui/material';
import moment from 'moment';
import { IoArrowDownSharp, IoArrowUpSharp } from 'react-icons/io5';

interface Props {
    className?: string;
    hash: string;
    date: number;
    coin: string;
    amount: number;
    type: 'sent' | 'received';
}

const HistoryItem: FC<Props> = ({ className, hash, coin, date, amount, type }) => {
    return (
        <ListItemButton className={className}>
            <Grid container direction="row" alignItems="center" columnSpacing={3}>
                <Grid item xs="auto" md="auto">
                    {type === 'sent' ? <IoArrowUpSharp /> : <IoArrowDownSharp />}
                </Grid>
                <Grid item md xs>
                    <Typography variant="body2">{hash.slice(0, 23) + '...'}</Typography>
                    <Chip label={coin} variant="outlined" color="primary" size="small" />
                </Grid>
                <Grid item xs md>
                    <Typography align="right">
                        {type === 'sent' ? '+' : '-'}
                        {amount}
                        {coin}
                    </Typography>
                    <Typography align="right">{moment(date).startOf('day').fromNow()}</Typography>
                </Grid>
            </Grid>
        </ListItemButton>
    );
};

export default styled(HistoryItem)``;
