import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
    FormControl,
    IconButton,
    MenuItem,
    Select,
    SelectChangeEvent,
    Theme,
    Typography,
    useMediaQuery,
} from '@mui/material';
import QRCode from 'react-qr-code';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Logo from '../../../assets/logo.svg';
import { ContentCopyOutlined } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CurrencySelectItem, DepositSkeleton } from '../components';
import { useSelector } from 'react-redux';
import useAddresses from '../../../api/UseAddresses';

interface Props {
    className?: string;
}

const currencies = [
    { id: '1', name: 'Bitcoin', shortName: 'BTC', icon: Logo, address: 'KofAiUApZ6qV5Vw3cqN89bdaXGat3E9AwD' },
    { id: '5', name: 'AOK', shortName: 'AOK', icon: Logo, address: '0x25009a9Eb7048f788793b50e641ceDdEd7AAB43f' },
    { id: '2', name: 'ETH', shortName: 'BTC', icon: Logo, address: 'KofAiUApZ6qV5Vw3cqN89bdaXGat3E9AwD' },
    { id: '3', name: 'Sugar', shortName: 'BTC', icon: Logo, address: '0x25009a9Eb7048f788793b50e641ceDdEd7AAB43f' },
    { id: '4', name: 'Tether', shortName: 'BTC', icon: Logo, address: 'KofAiUApZ6qV5Vw3cqN89bdaXGat3E9AwD' },
];

const Deposit: FC<Props> = ({ className }) => {
    const mobile = useMediaQuery(({ breakpoints }: Theme) => breakpoints.down('sm'));

    const [currency, setCurrency] = useState('1');
    const [address, setAddress] = useState(currencies.find((x) => x.id === currency)!.address);
    const { enqueueSnackbar } = useSnackbar();

    const token = useSelector((state: any) => state.login.token);
    const { isLoading, error } = useAddresses({ auth: token });

    const handleChange = (event: SelectChangeEvent) => {
        setCurrency(event.target.value);
        setAddress(currencies.find((x) => x.id === currency)!.address);
    };

    const onCopy = () => {
        enqueueSnackbar('Address has been successfully copied to clipboard.', { variant: 'success' });
    };

    useEffect(() => {
        if (error) {
            enqueueSnackbar(`UserInfo: ${error?.message}`, { variant: 'error' });
        }
    }, [error]);

    const component = (
        <div className={className}>
            <Typography variant="h4" mb={4}>
                Deposit
            </Typography>
            <div className="deposit-box">
                <FormControl fullWidth>
                    <Select
                        value={currency}
                        onChange={handleChange}
                        displayEmpty
                        fullWidth
                        IconComponent={ExpandMoreRoundedIcon}
                    >
                        {!isLoading &&
                            currencies &&
                            currencies?.map((item) => (
                                <MenuItem value={item.id} key={item.id}>
                                    <CurrencySelectItem {...item} />
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
                <div className="qr-code">
                    <QRCode value={address} size={mobile ? 135 : 200} />
                </div>
                <Typography color="textSecondary" className="copy-txt" noWrap>
                    {address}
                    <CopyToClipboard onCopy={onCopy} text={address}>
                        <IconButton size="small">
                            <ContentCopyOutlined className="icon-btn" />
                        </IconButton>
                    </CopyToClipboard>
                </Typography>
                <div className="deposit-warning">
                    <InfoOutlinedIcon color="warning" />
                    <Typography variant="caption" display="block" ml={1}>
                        The balance will be updated automatically when we receive coins on deposit address
                    </Typography>
                </div>
            </div>
        </div>
    );

    return isLoading ? <DepositSkeleton /> : component;
};

export default styled(Deposit)`
    .deposit-warning {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .deposit-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .qr-code {
        margin: ${({ theme }) => theme.spacing(6.5, 0, 3)};
    }

    .copy-txt {
        margin: ${({ theme }) => theme.spacing(2)};
        padding: ${({ theme }) => theme.spacing(2, 7)};
        border: ${({ theme }) => theme.palette.divider} 1px solid;
        border-radius: 4px;
    }
`;
