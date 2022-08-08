import { SnackbarContent } from 'notistack';
import styled from 'styled-components';
import React from 'react';
import { Grid } from '@mui/material';
import { RiCheckboxCircleFill } from 'react-icons/ri';

interface ReportSuccessProps {
    id: string;
    message: string;
    className?: string;
}

const ReportSuccess = React.forwardRef<HTMLDivElement, ReportSuccessProps>((props, ref) => {
    const { id, message, className, ...other } = props;
    return (
        <SnackbarContent ref={ref} role="alert" {...other} className={className}>
            <Grid container className="card" direction="row" alignItems="center">
                <Grid container item md="auto" xs="auto" alignItems="center" className="iconWraper">
                    <RiCheckboxCircleFill className="icon" />
                </Grid>
                <Grid item md xs>
                    {message}
                </Grid>
            </Grid>
        </SnackbarContent>
    );
});

export default styled(ReportSuccess)`
    width: 466px;
    .card {
        background-color: #6c82cf;
        padding: 18px;
        color: white;
    }

    .icon {
        height: 20px;
        width: 20px;
    }

    .iconWraper {
        margin-right: 18px;
    }
`;
