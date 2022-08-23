import React, { FC, useState } from 'react';
import styled from 'styled-components';
import {
    Dialog,
    DialogTitle,
    FormControl,
    IconButton,
    MenuItem,
    Select,
    SelectChangeEvent,
    Theme,
    useMediaQuery,
    Button,
    TextField,
    InputAdornment,
    Divider,
    Grid,
    Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm, Controller } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import { useSnackbar } from 'notistack';
import { CurrencySelectItem } from './index';
// import { isAddress as isAOKAddress } from '../../../services/address';

import Logo from '../../../assets/logo.svg';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import CloseIcon from '@mui/icons-material/Close';
import { IoWalletOutline } from 'react-icons/io5';
import { Withdraw as WithdrawType } from '../../../types/Withdraw';

interface Props {
    className?: string;
    open: boolean;
    onClose: any;
}

const Withdraw: FC<Props> = ({ className, open, onClose }) => {
    const mobile = useMediaQuery(({ breakpoints }: Theme) => breakpoints.down('sm'));

    const {
        register,
        handleSubmit,
        control,
        reset,
        watch,
        formState: { errors: fieldsErrors },
    } = useForm<WithdrawType>();

    const currencies = [
        { id: 1, name: 'Bitcoin', shortName: 'BTC', icon: Logo },
        { id: 2, name: 'ETH', shortName: 'ETH', icon: Logo },
        { id: 3, name: 'Sugar', shortName: 'SGR', icon: Logo },
        { id: 4, name: 'Tether', shortName: 'TTH', icon: Logo },
    ];
    const [currency, setCurrency] = useState('BTC');
    const [isSending, setIsSending] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const watchAmount = watch('amount');

    const handleSelectChange = (event: SelectChangeEvent) => {
        setCurrency(event.target.value);
    };

    const onSubmit = async (data: WithdrawType) => {
        try {
            alert(JSON.stringify(data));
            reset();
        } catch (e) {
            if (e instanceof Error)
                enqueueSnackbar(e.message, {
                    variant: 'error',
                });

            setIsSending(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullScreen={mobile} fullWidth maxWidth="sm" className={className}>
            <DialogTitle variant="h5" padding={3.5}>
                Withdraw
            </DialogTitle>
            <IconButton className="close-btn" onClick={onClose}>
                <CloseIcon />
            </IconButton>
            <form className="withdraw-box" onSubmit={handleSubmit(onSubmit)}>
                <FormControl fullWidth>
                    <Controller
                        name="network"
                        render={({ field }) => (
                            <Select
                                {...field}
                                {...register('network')}
                                className="form-field"
                                value={currency}
                                onChange={handleSelectChange}
                                displayEmpty
                                fullWidth
                                IconComponent={ExpandMoreRoundedIcon}
                            >
                                {currencies.map((item) => (
                                    <MenuItem value={item.shortName} key={item.id}>
                                        <CurrencySelectItem {...item} />
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                        control={control}
                        rules={{
                            required: 'Currency required',
                            // validate: isAddress,
                        }}
                    />
                    <Controller
                        name="address"
                        render={({ field: { value, ...rest } }) => (
                            <TextField
                                {...rest}
                                value={value ?? ''}
                                id="address"
                                className="form-field"
                                variant="outlined"
                                color="primary"
                                label="Withdraw Address"
                                placeholder="KXStk8wJupWJ4vsDu1ZxkmcM5U6L2yrWoD"
                                helperText={fieldsErrors.address ? fieldsErrors.address.message : undefined}
                                error={Boolean(fieldsErrors.address)}
                                InputLabelProps={{ shrink: true }}
                                {...register('address')}
                            />
                        )}
                        control={control}
                        rules={{
                            required: 'Address required',
                            // validate: isAddress,
                        }}
                    />
                    <Controller
                        name="amount"
                        render={({ field: { value, ...rest } }) => (
                            <NumberFormat
                                {...rest}
                                value={value ?? ''}
                                customInput={TextField}
                                thousandSeparator
                                allowNegative={false}
                                className="form-field"
                                label="Amount"
                                placeholder="Enter the amount"
                                isNumericString
                                helperText={fieldsErrors.amount ? fieldsErrors.amount.message : undefined}
                                error={Boolean(fieldsErrors.amount)}
                                InputLabelProps={{ shrink: true }}
                                InputProps={{
                                    endAdornment: (
                                        <>
                                            <InputAdornment position="end">{currency}</InputAdornment>
                                            <InputAdornment position="end">
                                                <Button sx={{ minWidth: 0 }} size="small">
                                                    Max
                                                </Button>
                                            </InputAdornment>
                                        </>
                                    ),
                                }}
                            />
                        )}
                        control={control}
                        rules={{
                            required: 'Amount required',
                            min: {
                                value: 0,
                                message: 'Amount must be a positive number',
                            },
                        }}
                    />
                </FormControl>
                <Divider className="divider" />
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item xs={12} md={8} sm={8}>
                        <Typography variant="body2">Total send:</Typography>
                        <div className="total-box">
                            <Typography variant="h5" color="primary" textOverflow="ellipsis" overflow="hidden" noWrap>
                                <NumberFormat
                                    displayType="text"
                                    value={watchAmount || 0}
                                    isNumericString
                                    decimalScale={4}
                                    thousandSeparator
                                    fixedDecimalScale
                                />
                            </Typography>
                            <Typography variant="h6" color="primary" className="total-send-currency" fontWeight="bold">
                                {currency}
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs="auto" md="auto" sm="auto" justifyContent="flex-end">
                        <LoadingButton
                            loading={isSending}
                            loadingPosition="start"
                            color="primary"
                            variant="contained"
                            type="submit"
                            startIcon={<IoWalletOutline />}
                            size="large"
                        >
                            <Typography color="white" variant="button">
                                Send
                            </Typography>
                        </LoadingButton>
                    </Grid>
                </Grid>
            </form>
        </Dialog>
    );
};

export default styled(Withdraw)`
    .withdraw-box {
        padding: ${({ theme }) => theme.spacing(3.5)};
    }

    .close-btn {
        position: absolute;
        right: 16px;
        top: 16px;
    }

    .form-field {
        margin-top: ${({ theme }) => theme.spacing(2)};
    }

    .icon-enabled {
        color: ${({ theme }) => theme.palette.grey[900]};
    }

    .form,
    .divider {
        margin-bottom: ${({ theme }) => theme.spacing(3)};
    }

    .total-box {
        display: flex;
        align-items: flex-end;

        .total-send-currency {
            line-height: 1.8;
            padding-bottom: 1px;
            padding-left: ${({ theme }) => theme.spacing(0.5)};
            font-weight: bold;
        }

        .coin-logo {
            padding-bottom: 3px;
        }
    }
`;
