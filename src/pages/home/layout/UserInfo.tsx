import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
    Avatar,
    Button,
    FormControl,
    Grid,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Theme,
    Typography,
    useMediaQuery,
} from '@mui/material';
import Logo from '../../../assets/logo.svg';
import { BiUpload } from 'react-icons/all';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { BalanceSelectItem, Withdraw } from '../components';
import useProfile from '../../../api/UseProfile';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

interface Props {
    className?: string;
}

const UserInfo: FC<Props> = ({ className }) => {
    const token = useSelector((state: any) => state.login.token);

    const { data: profileData, isLoading, error } = useProfile({ auth: token });

    const mobile = useMediaQuery(({ breakpoints }: Theme) => breakpoints.down('sm'));
    const [openDialog, setOpenDialog] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const fakeUserName = 'Oleh Smith';
    const [cryptocurrency, setCryptocurrency] = useState('1');

    const handleSelectChange = (event: SelectChangeEvent) => {
        setCryptocurrency(event.target.value);
    };

    const currencies = [
        { id: 1, name: 'BTC', icon: Logo, balance: 92292929292 },
        { id: 2, name: 'ETH', icon: Logo, balance: 92292929292 },
        { id: 3, name: 'Sugar', icon: Logo, balance: 92292929292 },
        { id: 4, name: 'Tether', icon: Logo, balance: 92292929292 },
    ];

    useEffect(() => {
        if (error) {
            enqueueSnackbar(`UserInfo: ${error?.message}`, { variant: 'error' });
        }
    }, [error]);

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
                    <Typography color="textSecondary" noWrap>
                        {!isLoading && profileData && profileData.address}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container alignItems="center" justifyContent="space-between" columnSpacing={2}>
                <Grid item sm="auto" xs={12} pb={mobile ? 4 : 0}>
                    <FormControl fullWidth>
                        <Select
                            value={cryptocurrency}
                            variant="standard"
                            onChange={handleSelectChange}
                            displayEmpty
                            disableUnderline
                            IconComponent={ExpandMoreRoundedIcon}
                        >
                            {currencies.map((item) => (
                                <MenuItem value={item.id} key={item.id}>
                                    <BalanceSelectItem {...item} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item md="auto">
                    <Button
                        variant="contained"
                        color="primary"
                        className="button"
                        startIcon={<BiUpload />}
                        onClick={() => setOpenDialog(true)}
                    >
                        Withdraw
                    </Button>
                </Grid>
            </Grid>
            <Withdraw open={openDialog} onClose={() => setOpenDialog(false)} />
        </Paper>
    );
};

export default styled(UserInfo)`
    padding: ${({ theme }) => theme.spacing(4, 3)};

    .button {
        text-transform: none;
        margin-left: 16px;
    }

    .icon-btn {
        color: ${({ theme }) => theme.palette.grey['700']};
    }
`;
