import React, { FC } from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import NumberFormat from 'react-number-format';

interface Props {
    className?: string;
    id?: number;
    name?: string;
    icon?: string;
    balance?: number;
}

const CurrencySelectItem: FC<Props> = ({ className, name, icon, balance }) => {
    return (
        <div className={className}>
            <img src={icon} width={24} height={24} alt="logo" className="select-icon" />
            <Typography variant="h6">
                {name} <NumberFormat displayType="text" decimalScale={4} thousandSeparator value={balance} />
            </Typography>
        </div>
    );
};

export default styled(CurrencySelectItem)`
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .select-icon {
        padding-right: ${({ theme }) => theme.spacing(1)};
    }
`;
