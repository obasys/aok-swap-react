import React, {FC} from 'react';
import {AppBar,} from '@mui/material';
import styled from 'styled-components';

interface Props {
    className?: string;
}

const Navigation: FC<Props> = ({className, ...props}) => {
    return (
        <AppBar className={className} color="transparent" elevation={0}>
        </AppBar>
    );
};

export default styled(Navigation)``;
