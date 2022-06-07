import React, { FC } from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';

interface Props {
    className?: string;
}

const Deposit: FC<Props> = ({ className }) => {
    return (
        <div className={className}>
            <Typography variant="h4" color="primary">
                Deposit
            </Typography>
        </div>
    );
};

export default styled(Deposit)`
    padding: ${({ theme }) => theme.spacing(3)};
`;
