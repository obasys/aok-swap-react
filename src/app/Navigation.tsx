import React, { FC, useState } from 'react';
import { AppBar, Button, Container, IconButton, Theme, Toolbar, Typography, useMediaQuery } from '@mui/material';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import Logo from '../assets/logos/logo-green.svg';
import { MobileDrawer } from './index';

interface Props {
    className?: string;
}

const Navigation: FC<Props> = ({ className }) => {
    const mobile = useMediaQuery(({ breakpoints }: Theme) => breakpoints.down('sm'));
    const [isDrawerOpened, setIsDrawerOpened] = useState(false);

    const logo = (
        <Button component={Link} to="/">
            <img src={Logo} width={32} height={32} alt="logo" />
            <Typography variant="h6" ml={1} color="primary">
                AOK Swap
            </Typography>
        </Button>
    );

    const mobileNav = (
        <div className="mobile">
            {logo}
            <IconButton size="large" onClick={() => setIsDrawerOpened(true)}>
                <MenuRoundedIcon fontSize="large" />
            </IconButton>
        </div>
    );

    const desktopNav = (
        <Toolbar className="toolbar">
            <AppBar className="links-box" elevation={0}>
                <Container>
                    <div className="links">
                        <div className="grow">{logo}</div>
                        <div className="nav-btns">
                            <Button component={Link} to="/" className="link">
                                <Typography textTransform="none" variant="body1">
                                    Home
                                </Typography>
                            </Button>
                            <Button component={Link} to="/deposit" className="link">
                                <Typography textTransform="none" variant="body1">
                                    Deposit
                                </Typography>
                            </Button>
                            <Button component={Link} to="/menu" className="link">
                                <Typography textTransform="none" variant="body1">
                                    Withdraw
                                </Typography>
                            </Button>
                            <Button className="link" variant="outlined" startIcon={<LogoutIcon />}>
                                <Typography textTransform="none" variant="body1">
                                    Logout
                                </Typography>
                            </Button>
                        </div>
                    </div>
                </Container>
            </AppBar>
        </Toolbar>
    );

    return (
        <AppBar className={className} color="transparent" elevation={0} position="static">
            <Toolbar disableGutters className="tool-bar">
                {mobile ? mobileNav : desktopNav}
                <MobileDrawer isDrawerOpened={isDrawerOpened} setIsDrawerOpened={setIsDrawerOpened} />
            </Toolbar>
        </AppBar>
    );
};

export default styled(Navigation)`
    .toolbar {
        height: 77px;
    }

    .links-box {
        background-color: ${({ theme }) => theme.palette.background.default};
        border-bottom: solid 1px ${({ theme }) => theme.palette.divider};
    }

    .links {
        padding: ${({ theme }) => theme.spacing(2, 0)};
        display: flex;
        width: 100%;

        .grow {
            flex-grow: 1;
            display: flex;
            align-items: center;
        }

        .link {
            margin: ${({ theme }) => theme.spacing(0, 2)};
        }

        .nav-btns {
            display: flex;
            align-items: center;
        }
    }

    .mobile {
        width: 100vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: solid 1px ${({ theme }) => theme.palette.divider};
    }
`;
