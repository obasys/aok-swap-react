import React, { FC } from 'react';
import styled from 'styled-components';
import { ButtonBase, Chip, Grid, Typography } from '@mui/material';
import moment from 'moment';
import { IoArrowDownSharp, IoArrowUpSharp } from 'react-icons/io5';

interface Props {
    className?: string;
    hash: string;
    date: number;
    coin: string;
    amount: number;
    type: 'sent' | 'recieved';
}

const HistoryItem: FC<Props> = ({ className, hash, coin, date, amount, type }) => {
    return (
        <ButtonBase className={className}>
            <Grid
                container
                direction="row"
                // justifyContent="space-between"
                alignItems="center"
                columnSpacing={3}
            >
                <Grid item xs="auto" md="auto">
                    {type === 'sent' ? <IoArrowUpSharp /> : <IoArrowDownSharp />}
                </Grid>
                <Grid item md xs>
                    <Typography variant="body2">{hash.substr(0, 23) + '...'}</Typography>
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
        </ButtonBase>
    );
};

export default styled(HistoryItem)``;
