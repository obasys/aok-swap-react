import React, { FC } from 'react';
import styled from 'styled-components';
import { FormControl, Grid, IconButton, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import QRCode from 'react-qr-code';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Logo from '../../../assets/logo.svg';
import { ContentCopyOutlined } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { DepositSelectItem } from '../components';

interface Props {
    className?: string;
}

const Deposit: FC<Props> = ({ className }) => {
    const [currency, setCurrency] = React.useState('1');
    const inputValue = 'f23hg2h3jh2j3gj2g32k3h2h3k2jh32';
    const { enqueueSnackbar } = useSnackbar();

    const handleChange = (event: SelectChangeEvent) => {
        setCurrency(event.target.value);
    };
    const onCopy = () => {
        enqueueSnackbar('Address has been successfully copied to clipboard.');
    };
    const currencies = [
        { id: 1, name: 'Bitcoin', shortName: 'BTC', icon: Logo },
        { id: 2, name: 'ETH', shortName: 'BTC', icon: Logo },
        { id: 3, name: 'Sugar', shortName: 'BTC', icon: Logo },
        { id: 4, name: 'Tether', shortName: 'BTC', icon: Logo },
    ];

    return (
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
                        {currencies.map((item) => (
                            <MenuItem value={item.id} key={item.id}>
                                <DepositSelectItem {...item} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <div className="qr-code">
                    <QRCode value="https://twitter.com/tarnovski_john/status/1544399487765979138" size={200} />
                </div>
                <Typography color="textSecondary" className="copy-txt" noWrap>
                    {inputValue}
                    <CopyToClipboard onCopy={onCopy} text={inputValue}>
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
