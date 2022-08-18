import React, { FC } from 'react';
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
    Typography,
    useMediaQuery,
} from '@mui/material';
import Logo from '../../../assets/logo.svg';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { CurrencySelectItem } from './index';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
    className?: string;
    open: boolean;
    onClose: any;
}

const Withdraw: FC<Props> = ({ className, open, onClose }) => {
    const mobile = useMediaQuery(({ breakpoints }: Theme) => breakpoints.down('sm'));

    const currencies = [
        { id: 1, name: 'Bitcoin', shortName: 'BTC', icon: Logo },
        { id: 2, name: 'ETH', shortName: 'BTC', icon: Logo },
        { id: 3, name: 'Sugar', shortName: 'BTC', icon: Logo },
        { id: 4, name: 'Tether', shortName: 'BTC', icon: Logo },
    ];
    const [currency, setCurrency] = React.useState('1');

    const handleSelectChange = (event: SelectChangeEvent) => {
        setCurrency(event.target.value);
    };

    return (
        <Dialog open={open} onClose={onClose} fullScreen={mobile} fullWidth maxWidth="sm" className={className}>
            <DialogTitle variant="h5" padding={3.5}>
                Withdraw
            </DialogTitle>
            <IconButton className="close-btn" onClick={onClose}>
                <CloseIcon />
            </IconButton>
            <div className="withdraw-box">
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
                </FormControl>
            </div>
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
`;
