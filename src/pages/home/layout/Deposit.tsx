import React, { FC } from 'react';
import styled from 'styled-components';
import {
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import QRCode from 'react-qr-code';
import { FaCopy } from 'react-icons/fa';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { AiFillExclamationCircle } from 'react-icons/ai';
import Logo from '../../../components/assets/Group 6.svg';

interface Props {
    className?: string;
}

const Deposit: FC<Props> = ({ className }) => {
    const [cryptocurrency, setСryptocurrency] = React.useState('');
    const inputValue = 'f23hg2h3jh2j3gj2g32k3h2h3k2jh32';
    const theme = useTheme();

    const handleChange = (event: SelectChangeEvent) => {
        setСryptocurrency(event.target.value);
    };

    return (
        <div className={className}>
            <Typography variant="h4" fontWeight={700} style={{ marginBottom: '40px' }}>
                Deposit
            </Typography>
            <Stack direction="column" justifyContent="space-evenly" alignItems="center" spacing={2}>
                <FormControl fullWidth>
                    <Select
                        value={cryptocurrency}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
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
                <div className="qr-code">
                    <QRCode
                        value="https://twitter.com/tarnovski_john/status/1544399487765979138"
                        fgColor={theme.palette.primary.dark}
                        size={200}
                    />
                </div>
                <TextField
                    value={inputValue}
                    disabled
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <CopyToClipboard text={inputValue}>
                                    <IconButton color="primary">
                                        <FaCopy />
                                    </IconButton>
                                </CopyToClipboard>
                            </InputAdornment>
                        ),
                    }}
                />
                <Grid container alignItems="center" columnSpacing={1}>
                    <Grid item xs="auto" md="auto">
                        <AiFillExclamationCircle />
                    </Grid>
                    <Grid item xs md>
                        <Typography component="span" variant="body1" color="black">
                            The balance will be updated automatically when we receive coins on deposit address
                        </Typography>
                    </Grid>
                    <Grid item md={2} />
                </Grid>
            </Stack>
        </div>
    );
};

export default styled(Deposit)`
    padding: ${({ theme }) => theme.spacing(0, 0)};

    .qr-code {
        border: 4px solid ${({ theme }) => theme.palette.primary.main};
        padding: 15px;
        box-shadow: 6px 6px 0px 0px ${({ theme }) => theme.palette.primary.main};
        margin-bottom: 10px;
    }
`;
