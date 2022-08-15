import React, { FC } from 'react';
import styled from 'styled-components';
import {
    Avatar,
    Box,
    Button,
    FormControl,
    Grid,
    IconButton,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Theme,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Logo from '../../../assets/logo.svg';
import { ContentCopyOutlined } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { BiDownload, BiUpload } from 'react-icons/all';
import { ReportSuccess } from '../../../components';

interface Props {
    className?: string;
}

const UserItem: FC<Props> = ({ className }) => {
    const mobile = useMediaQuery(({ breakpoints }: Theme) => breakpoints.down('sm'));

    const fakeUserName = 'Oleh Smith';
    const inputValue = 'f23hg2h3jh2j3gj2g32k3h2h3k2jh32';
    const [cryptocurrency, setCryptocurrency] = React.useState('');
    const { enqueueSnackbar } = useSnackbar();

    const handleSelectChange = (event: SelectChangeEvent) => {
        setCryptocurrency(event.target.value);
    };
    const onCopy = () => {
        enqueueSnackbar('Address has been successfully copied to clipboard.');
    };
    const handleDeposit = () => {
        enqueueSnackbar(<Typography>You just deposited 23,315.0000 SUGAR on your account</Typography>, {
            content: (key, message) => <ReportSuccess id={key} message={message} />,
        });
    };

    return (
        <Paper className={className} variant="outlined">
            <Grid container alignItems="center" justifyContent="space-between" columnSpacing={2} pb={mobile ? 4 : 8}>
                <Grid item container md="auto" xs={8} alignItems="center" direction="row">
                    <Avatar>OS</Avatar>
                    <Typography variant="h6" ml={1}>
                        {fakeUserName}
                    </Typography>
                </Grid>
                <Grid item md="auto" xs={4} flexDirection="row">
                    <Box display="flex" alignItems="center">
                        <Typography color="textSecondary" noWrap>
                            {inputValue}
                        </Typography>
                        <CopyToClipboard onCopy={onCopy} text={inputValue}>
                            <IconButton size="small">
                                <ContentCopyOutlined className="icon-btn" />
                            </IconButton>
                        </CopyToClipboard>
                    </Box>
                </Grid>
            </Grid>
            <Grid container alignItems="center" justifyContent="space-between" columnSpacing={2}>
                <Grid item md={4} xs={12} pb={mobile ? 4 : 0}>
                    <FormControl fullWidth>
                        <Select
                            value={cryptocurrency}
                            variant="standard"
                            fullWidth
                            onChange={handleSelectChange}
                            displayEmpty
                        >
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
                        onClick={handleDeposit}
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
    //margin-bottom: ${({ theme }) => theme.spacing(8)};

    .button {
        text-transform: none;
        margin-left: 16px;
    }

    .icon-btn {
        color: ${({ theme }) => theme.palette.grey['700']};
    }
`;
