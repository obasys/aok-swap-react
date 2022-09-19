import React, { ChangeEvent, FC, useState } from 'react';
import { Grid, List, MenuItem, Pagination, Select, SelectChangeEvent, Typography } from '@mui/material';
import styled from 'styled-components';
import { HistoryItem, HistorySkeleton } from '../components';
import { History as HistoryType } from '../../../types/History';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

interface Props {
    className?: string;
}

const history: HistoryType[] = [
    {
        type: 'deposit',
        timestamp: 1661068989,
        confirmed: true,
        network: 'AVALANCHE',
        height: 12716744,
        txid: '0x6f8ea78339014dd358f210d077f817913a33e14021e7e275785014cfcd18e589',
        amount: 0.31,
    },
    {
        type: 'deposit',
        timestamp: 1661068989,
        confirmed: true,
        network: 'POLYGON',
        height: 27715008,
        txid: '0x101f122d3747cf984816b50a7721ebc9f6c617d9b92d2073adf7fa118e45b66d',
        amount: 0.34,
    },
    {
        type: 'deposit',
        timestamp: 1661068989,
        confirmed: true,
        network: 'BSC',
        height: 22142598,
        txid: '0x8fcd04f8f1954834d556aaea8b33a4452e06240e06cbae9d8e2d22bd4cdb3d42',
        amount: 0.35,
    },
    {
        type: 'deposit',
        timestamp: 1661068990,
        confirmed: true,
        network: 'AVALANCHE',
        height: 12716745,
        txid: '0x9ce64db8a2c2648fac6224c2ba55725f9924cd9ba3416783edb1804f8727877a',
        amount: 0.89,
    },
    {
        type: 'deposit',
        timestamp: 1661069028,
        confirmed: true,
        network: 'AOK',
        height: 1057593,
        txid: '9412fe5594c30bbb4088f20dfb04eacc2bb9e1f7643bf0a01c28c54ccef685ae',
        amount: 0.83,
    },
    {
        type: 'deposit',
        timestamp: 1661068989,
        confirmed: true,
        network: 'AVALANCHE',
        height: 12716744,
        txid: '0x6f8ea78339014dd358f210d077f817913a33e14021e7e275785014cfcd18e589',
        amount: 0.31,
    },
    {
        type: 'deposit',
        timestamp: 1661068989,
        confirmed: true,
        network: 'POLYGON',
        height: 27715008,
        txid: '0x101f122d3747cf984816b50a7721ebc9f6c617d9b92d2073adf7fa118e45b66d',
        amount: 0.34,
    },
    {
        type: 'deposit',
        timestamp: 1661068989,
        confirmed: true,
        network: 'BSC',
        height: 22142598,
        txid: '0x8fcd04f8f1954834d556aaea8b33a4452e06240e06cbae9d8e2d22bd4cdb3d42',
        amount: 0.35,
    },
    {
        type: 'deposit',
        timestamp: 1661068990,
        confirmed: true,
        network: 'AVALANCHE',
        height: 12716745,
        txid: '0x9ce64db8a2c2648fac6224c2ba55725f9924cd9ba3416783edb1804f8727877a',
        amount: 0.89,
    },
    {
        type: 'deposit',
        timestamp: 1661069028,
        confirmed: true,
        network: 'AOK',
        height: 1057593,
        txid: '9412fe5594c30bbb4088f20dfb04eacc2bb9e1f7643bf0a01c28c54ccef685ae',
        amount: 29292992922929292.83,
    },
];

const History: FC<Props> = ({ className }) => {
    const [filter, setFilter] = useState('1');
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const handleChangePage = (event: ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleSelectChange = (event: SelectChangeEvent) => {
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
                        onChange={handleSelectChange}
                        displayEmpty
                        disableUnderline
                        variant="standard"
                        IconComponent={ExpandMoreRoundedIcon}
                        className="menu-item"
                    >
                        <MenuItem value={1} className="menu-item">
                            <Typography variant="h6">Deposit</Typography>
                        </MenuItem>
                        <MenuItem value={2}>
                            <Typography variant="h6">Withdraw</Typography>
                        </MenuItem>
                    </Select>
                </Grid>
            </Grid>
            <List>
                {history.slice((page - 1) * itemsPerPage, (page - 1) * itemsPerPage + itemsPerPage).map((item, idx) => (
                    <HistoryItem {...item} key={idx} />
                ))}
            </List>
            <div className="pagination">
                <Pagination
                    count={Math.ceil(history.length / itemsPerPage)}
                    page={page}
                    onChange={handleChangePage}
                    variant="outlined"
                />
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
    .menu-item {
        margin: 4px;
    }
`;
