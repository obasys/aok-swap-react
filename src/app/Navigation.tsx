import React, { FC, useState, MouseEvent } from 'react';
import {
    AppBar,
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    Theme,
    useMediaQuery,
} from '@mui/material';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Logo from '../assets/logo.svg';

interface Props {
    className?: string;
}

const Navigation: FC<Props> = ({ className }) => {
    const links = ['Contact us', 'Explorer', 'Log out'];
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const mobile = useMediaQuery(({ breakpoints }: Theme) => breakpoints.down('sm'));

    const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const logo = (
        <Grid item container xs md>
            <Button component={Link} to="/">
                <img src={Logo} width={52} height={46.15} alt="logo" />
                <Typography variant="h6" ml={1} color="white" textTransform="uppercase" fontWeight="300">
                    sugar
                </Typography>
                <Typography color="white" fontWeight="700" variant="h6" textTransform="uppercase">
                    bridge
                </Typography>
            </Button>
        </Grid>
    );

    const mobileNav = (
        <Box flexGrow={1} display="flex">
            <IconButton size="large" onClick={handleOpenNavMenu}>
                <MenuRoundedIcon className="menu-icon" />
            </IconButton>
            <Menu
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
            >
                {links.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );

    const desktopNav = (
        <Box flexGrow={1} display="flex">
            {links.map((page) => (
                <Button key={page} onClick={handleCloseNavMenu}>
                    <Typography color="white" variant="button" my={2}>
                        {page}
                    </Typography>
                </Button>
            ))}
        </Box>
    );

    return (
        <AppBar className={className} color="transparent" elevation={0} position="static">
            <Toolbar disableGutters className="tool-bar">
                <Container>
                    <Grid container direction="row" alignItems="center">
                        {logo}
                        <Grid item xs="auto" md="auto">
                            {mobile ? mobileNav : desktopNav}
                        </Grid>
                    </Grid>
                </Container>
            </Toolbar>
        </AppBar>
    );
};

export default styled(Navigation)`
    .tool-bar {
        background-color: rgb(112, 129, 201);
    }

    .menu-icon {
        color: ${({ theme }) => theme.palette.common.white};
    }
`;
