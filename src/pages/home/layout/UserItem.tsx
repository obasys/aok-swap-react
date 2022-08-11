import React, { FC } from 'react';
import styled from 'styled-components';
import {
    Avatar,
    Button,
    FormControl,
    Grid,
    IconButton,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Typography,
} from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Logo from '../../../assets/logo.svg';
import { ContentCopyOutlined } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { BiDownload, BiUpload } from 'react-icons/all';

interface Props {
    className?: string;
}

const UserItem: FC<Props> = ({ className }) => {
    const fakeUserName = 'Oleh Smith';
    const inputValue = 'f23hg2h3jh2j3gj2g32k3h2h3k2jh32';
    const [cryptocurrency, setCryptocurrency] = React.useState('');
    const { enqueueSnackbar } = useSnackbar();

    const handleChange = (event: SelectChangeEvent) => {
        setCryptocurrency(event.target.value);
    };
    const onCopy = () => {
        enqueueSnackbar('Address has been successfully copied to clipboard.');
    };

    return (
        <Paper className={className} variant="outlined">
            <Grid container alignItems="center" justifyContent="space-between" columnSpacing={2} pb={8}>
                <Grid item container md="auto" alignItems="center" direction="row">
                    <Avatar>OS</Avatar>
                    <Typography variant="h6" ml={1}>
                        {fakeUserName}
                    </Typography>
                </Grid>
                <Grid item md="auto" className="balance-btn">
                    <Typography color="textSecondary">
                        {inputValue}
                        <CopyToClipboard onCopy={onCopy} text={inputValue}>
                            <IconButton size="small">
                                <ContentCopyOutlined className="icon-btn" />
                            </IconButton>
                        </CopyToClipboard>
                    </Typography>
                </Grid>
            </Grid>
            <Grid container alignItems="center" justifyContent="space-between" columnSpacing={2}>
                <Grid item md={4}>
                    <FormControl fullWidth>
                        <Select value={cryptocurrency} variant="standard" onChange={handleChange} displayEmpty>
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    columnSpacing={2}
                                >
                                    <Grid item md="auto">
                                        <img src={Logo} width={52} height={46.15} alt="logo" />
                                    </Grid>
                                    <Grid item md="auto">
                                        <Typography>Sugarchain</Typography>
                                    </Grid>
                                    <Grid item md={5}>
                                        <Typography sx={{ textTransform: 'uppercase' }}>Sugar</Typography>
                                    </Grid>
                                </Grid>
                            </MenuItem>
                            <MenuItem value={20}>Ethereum</MenuItem>
                            <MenuItem value={30}>Tether</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item md="auto">
                    <Button
                        disableElevation
                        variant="contained"
                        color="primary"
                        className="button"
                        startIcon={<BiDownload />}
                    >
                        Deposit
                    </Button>
                    <Button variant="outlined" color="primary" className="button" startIcon={<BiUpload />}>
                        Withdraw
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default styled(UserItem)`
    padding: ${({ theme }) => theme.spacing(4, 3)};
    margin-bottom: ${({ theme }) => theme.spacing(8)};

    .balance-btn {
        // color: ${({ theme }) => theme.palette.common.white};
    }

    .button {
        text-transform: none;
        margin-left: 16px;
    }

    .icon-btn {
        color: ${({ theme }) => theme.palette.grey['700']};
    }
`;
