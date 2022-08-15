import React, { FC } from 'react';
import { FormControl, Grid, List, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import styled from 'styled-components';
import { HistoryItem } from '../components';
import coinIcon from '../../../assets/ABBC.svg';

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

const History: FC<Props> = ({ className }) => {
    const history: HistoryItemType = {
        type: 'received',
        hash: '2hh23h23h2h342j32jh3j23h2h3j2h3h2h34j2hj34h2j3h2',
        coin: 'BTC',
        amount: 214.242,
        date: 1656374400 * 1000,
        icon: coinIcon,
    };

    const [filter, setFilter] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setFilter(event.target.value as string);
    };

    return (
        <div className={className}>
            <Grid item container alignItems="center" md={12} mb={3}>
                <Grid item md xs>
                    <Typography variant="h4">History</Typography>
                </Grid>
                <Grid item md="auto" xs="auto">
                    <FormControl size="small">
                        <Select value={filter} onChange={handleChange} displayEmpty variant="standard">
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Deposit</MenuItem>
                            <MenuItem value={20}>Deposit</MenuItem>
                            <MenuItem value={30}>Deposit</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <List>
                <HistoryItem {...history} />
                <HistoryItem {...history} />
                <HistoryItem {...history} />
                <HistoryItem {...history} />
                <HistoryItem {...history} />
            </List>
        </div>
    );
};

export default styled(History)``;
