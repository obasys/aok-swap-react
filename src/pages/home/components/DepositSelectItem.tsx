import React, { FC } from 'react';
import styled from 'styled-components';
import { Avatar, Typography } from '@mui/material';

interface Props {
    className?: string;
    id?: number;
    name?: string;
    shortName?: string;
    icon?: string;
    balance?: number;
}

const CurrencySelectItem: FC<Props> = ({ className, name, shortName, icon }) => {
    return (
        <div className={className}>
            <Avatar>
                <img src={icon} width={24} height={24} alt="logo" />
            </Avatar>
            <Typography variant="subtitle1" ml={1}>
                {name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" ml={1}>
                {shortName}
            </Typography>
        </div>
    );
};

export default styled(CurrencySelectItem)`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;
