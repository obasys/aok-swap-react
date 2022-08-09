import React, { FC } from 'react';
import { FormControl, Grid, MenuItem, Pagination, Select, SelectChangeEvent, Typography } from '@mui/material';
import styled from 'styled-components';
import HistoryItem from '../components/HistoryItem';

type HistoryItemType = {
    hash: string;
    date: number;
    coin: string;
    amount: number;
    type: 'sent' | 'received';
};

interface Props {
    className?: string;
}

const History: FC<Props> = ({ className }) => {
    const history: HistoryItemType = {
        type: 'received',
        hash: '2hh23h23h2h342j32jh3j23h2h3j2h3h2h34j2hj34h2j3h2',
        coin: 'Sugarchain',
        amount: 21424234234234,
        date: 1656374400 * 1000,
    };

    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    return (
        <Grid container className={className} rowSpacing={0}>
            <Grid item container alignItems="center" md={12}>
                <Grid item md>
                    <Typography variant="h4" fontWeight={700}>
                        History
                    </Typography>
                </Grid>
                <Grid item md="auto">
                    <FormControl size="small">
                        <Select
                            value={age}
                            onChange={handleChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
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
            <Grid item md={12} container direction="column" alignItems="stretch" rowSpacing={4}>
                <Grid item>
                    <HistoryItem
                        type={history.type}
                        hash={history.hash}
                        coin={history.coin}
                        amount={history.amount}
                        date={history.date}
                    />
                </Grid>
                <Grid item>
                    <HistoryItem {...history} />
                </Grid>
                <Grid item>
                    <HistoryItem {...history} />
                </Grid>
                <Grid item>
                    <HistoryItem {...history} />
                </Grid>
                <Grid item>
                    <HistoryItem {...history} />
                </Grid>
                <Grid item>
                    <HistoryItem {...history} />
                </Grid>
            </Grid>
            <Grid item md={12} container justifyContent="flex-end">
                <Grid item>
                    <Pagination count={145} shape="rounded" size="large" color="primary" />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default styled(History)`
    // padding: ${({ theme }) => theme.spacing(0, 0)};
`;
