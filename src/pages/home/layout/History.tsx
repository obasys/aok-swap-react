import React, { FC } from 'react';
import { Typography } from '@mui/material';

interface Props {
    className?: string;
}

const History: FC<Props> = ({ className }) => {
    return (
        <div className={className}>
            <Typography variant="h4" color="primary">
                History
            </Typography>
        </div>
    );
};

export default History;
