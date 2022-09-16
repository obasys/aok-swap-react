import React, { FC, useState } from 'react';
import { Grid, List, MenuItem, Pagination, Select, SelectChangeEvent, Typography } from '@mui/material';
import styled from 'styled-components';
import { HistoryItem, HistorySkeleton } from '../components';
import coinIcon from '../../../assets/ABBC.svg';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

type HistoryItemType = {
    hash: string;
    date: number;
    coin: string;
    amount: number;
    type: 'sent' | 'received';
    icon?: string;
};

interface Props {
    className?: string;
}

const history: HistoryItemType[] = [
    {
        type: 'received',
        hash: '2hh23h23h2h342j32jh3j23h2h3j2h3h2h34j2hj34h2j3h2',
        coin: 'BTC',
        amount: 214.242,
        date: 1656374400 * 1000,
        icon: coinIcon,
    },
    {
        type: 'received',
        hash: '2hh23h23h2h342j32jh3j23h2h3j2h3h2h34j2hj34h2j3h2',
        coin: 'BTC',
        amount: 214.242,
        date: 1656374400 * 1000,
        icon: coinIcon,
    },
    {
        type: 'received',
        hash: '2hh23h23h2h342j32jh3j23h2h3j2h3h2h34j2hj34h2j3h2',
        coin: 'BTC',
        amount: 214.242,
        date: 1656374400 * 1000,
        icon: coinIcon,
    },
    {
        type: 'received',
        hash: '2hh23h23h2h342j32jh3j23h2h3j2h3h2h34j2hj34h2j3h2',
        coin: 'BTC',
        amount: 214.242,
        date: 1656374400 * 1000,
        icon: coinIcon,
    },
    {
        type: 'received',
        hash: '2hh23h23h2h342j32jh3j23h2h3j2h3h2h34j2hj34h2j3h2',
        coin: 'BTC',
        amount: 214.242,
        date: 1656374400 * 1000,
        icon: coinIcon,
    },
    {
        type: 'received',
        hash: '2hh23h23h2h342j32jh3j23h2h3j2h3h2h34j2hj34h2j3h2',
        coin: 'BTC',
        amount: 214.242,
        date: 1656374400 * 1000,
        icon: coinIcon,
    },
    {
        type: 'received',
        hash: '2hh23h23h2h342j32jh3j23h2h3j2h3h2h34j2hj34h2j3h2',
        coin: 'BTC',
        amount: 214.242,
        date: 1656374400 * 1000,
        icon: coinIcon,
    },
    {
        type: 'received',
        hash: '2hh23h23h2h342j32jh3j23h2h3j2h3h2h34j2hj34h2j3h2',
        coin: 'BTC',
        amount: 214.242,
        date: 1656374400 * 1000,
        icon: coinIcon,
    },
];

const History: FC<Props> = ({ className }) => {
    const [filter, setFilter] = useState('10');

    const handleChange = (event: SelectChangeEvent) => {
        setFilter(event.target.value as string);
    };

    const isLoading = false;

    const component = (
        <div className={className}>
            <Grid item container alignItems="center" md={12} mb={3}>
                <Grid item md xs>
                    <Typography variant="h4">History</Typography>
                </Grid>
                <Grid item md="auto" xs="auto">
                    <Select
                        value={filter}
                        onChange={handleChange}
                        displayEmpty
                        disabled
                        disableUnderline
                        variant="standard"
                        IconComponent={ExpandMoreRoundedIcon}
                    >
                        <MenuItem value={10}>
                            <Typography variant="h6">Deposit</Typography>
                        </MenuItem>
                        <MenuItem value={20}>
                            <Typography variant="h6">Deposit</Typography>
                        </MenuItem>
                        <MenuItem value={30}>
                            <Typography variant="h6">Deposit</Typography>
                        </MenuItem>
                    </Select>
                </Grid>
            </Grid>
            <List>
                {history.slice(0, 5).map((item, idx) => (
                    <HistoryItem {...item} key={idx} />
                ))}
            </List>
            <div className="pagination">
                <Pagination count={10} variant="outlined" disabled />
            </div>
        </div>
    );

    return isLoading ? <HistorySkeleton rows={5} /> : component;
};

export default styled(History)`
    .pagination {
        display: flex;
        justify-content: center;
    }
`;
