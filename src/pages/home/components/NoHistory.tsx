import React from 'react';
import styled from 'styled-components';
import { Box, Typography } from '@mui/material';
import aok from '../../../assets/logos/logo-green.svg';

interface NoHistoryProps {
    className?: string;
}

const NoHistory = ({ className }: NoHistoryProps) => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" className={className}>
            <img src={aok} alt="aok" className="no-history-img" />
            <Typography color="primary">{'It\x27s time to start the story!'}</Typography>
        </Box>
    );
};

export default styled(NoHistory)`
    padding: ${({ theme }) => theme.spacing(4)};

    .no-history-img {
        opacity: 35%;
        height: 84px;
        margin: ${({ theme }) => theme.spacing(4)} auto ${({ theme }) => theme.spacing(2)} auto;
    }
`;
