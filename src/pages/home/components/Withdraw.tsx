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
import Logo from '../../../assets/logo.svg';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { CurrencySelectItem } from './index';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import { LoadingButton } from '@mui/lab';

// import { isAddress as isAOKAddress } from '../../../services/address';

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
        setValue,
        reset,
        watch,
        formState: { errors: fieldsErrors },
    } = useForm<{ address: string; amount: string; fee: string }>({ defaultValues: { fee: String(0.001) } });

    const currencies = [
        { id: 1, name: 'Bitcoin', shortName: 'BTC', icon: Logo },
        { id: 2, name: 'ETH', shortName: 'BTC', icon: Logo },
        { id: 3, name: 'Sugar', shortName: 'BTC', icon: Logo },
        { id: 4, name: 'Tether', shortName: 'BTC', icon: Logo },
    ];
    const [currency, setCurrency] = useState('1');
    const [isSending, setIsSending] = useState(false);

    const handleSelectChange = (event: SelectChangeEvent) => {
        setCurrency(event.target.value);
    };
    const isAddress = true;

    return (
        <Dialog open={open} onClose={onClose} fullScreen={mobile} fullWidth maxWidth="sm" className={className}>
            <DialogTitle variant="h5" padding={3.5}>
                Withdraw
            </DialogTitle>
            <IconButton className="close-btn" onClick={onClose}>
                <CloseIcon />
            </IconButton>
            <form className="withdraw-box">
                <FormControl fullWidth>
                    <Select
                        value={currency}
                        onChange={handleSelectChange}
                        displayEmpty
                        fullWidth
                        IconComponent={ExpandMoreRoundedIcon}
                    >
                        {currencies.map((item) => (
                            <MenuItem value={item.id} key={item.id}>
                                <CurrencySelectItem {...item} />
                            </MenuItem>
                        ))}
                    </Select>
                    <Controller
                        name="address"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="address"
                                className="txt-field"
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
                        render={({ field }) => (
                            <NumberFormat
                                {...field}
                                customInput={TextField}
                                thousandSeparator
                                allowNegative={false}
                                className="txt-field"
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
                            <Typography
                                variant="h5"
                                color="primary"
                                className="total-send-value"
                                textOverflow="ellipsis"
                                overflow="hidden"
                                noWrap
                            >
                                <NumberFormat
                                    displayType="text"
                                    // value={(watchFee || 0) + (watchAmount || 0)}
                                    value={22}
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
                            // startIcon={<IoWalletOutline />}
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

    .txt-field {
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

        .total-send-value {
            font-family: 'Titillium Web', sans-serif;
            padding-right: ${({ theme }) => theme.spacing(0)};
        }

        .total-send-currency {
            line-height: 1.8;
            padding-bottom: 1px;
        }

        .coin-logo {
            padding-bottom: 3px;
        }
    }
`;
