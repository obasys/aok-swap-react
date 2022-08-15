import React, { FC } from 'react';
import styled from 'styled-components';
import { Avatar, ListItemAvatar, ListItemButton, ListItemText, Paper, Typography } from '@mui/material';
import moment from 'moment';
import { IoArrowDownSharp, IoArrowUpSharp } from 'react-icons/io5';

interface Props {
    className?: string;
    hash: string;
    date: number;
    coin: string;
    amount: number;
    type: 'sent' | 'received';
    icon?: string;
}

const HistoryItem: FC<Props> = ({ className, hash, coin, date, amount, type, icon }) => {
    return (
        <Paper className={className} variant="outlined">
            <ListItemButton>
                <ListItemAvatar>
                    <Avatar>{type === 'sent' ? <IoArrowUpSharp /> : <IoArrowDownSharp />}</Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <Typography variant="subtitle1" noWrap>
                            {hash.slice(0, 23) + '...'}
                        </Typography>
                    }
                    secondary={<Typography variant="subtitle2">{moment(date).startOf('day').fromNow()}</Typography>}
                />
                <img src={icon} alt="coin" />
                <Typography align="right" ml={1} variant="h6">
                    {coin} {type === 'sent' ? '+' : '-'}
                    {amount}
                </Typography>
            </ListItemButton>
        </Paper>
    );
};

export default styled(HistoryItem)`
    margin-bottom: 8px;
`;
