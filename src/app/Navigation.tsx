import React, { FC } from 'react';
import { AppBar, Box, Button, Container, Grid, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Logo from '../components/assets/Group 6.svg';

interface Props {
    className?: string;
}

const Navigation: FC<Props> = ({ className }) => {
    const links = ['Contact us', 'Explorer', 'Log out'];
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const logo = (
        <Grid item container direction="row" alignItems="center" xs md>
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

    return (
        <AppBar className={className} color="transparent" elevation={0} position="static">
            <Toolbar disableGutters className="tool-bar">
                <Container>
                    <Grid container direction="row" alignItems="center">
                        {logo}
                        <Grid item xs="auto" md="auto">
                            <Box flexGrow={1} display={{ xs: 'flex', md: 'none' }}>
                                <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
                                    <MenuRoundedIcon />
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
                                    sx={{
                                        display: { xs: 'block', md: 'none' },
                                    }}
                                >
                                    {links.map((page) => (
                                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">{page}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                            <Box flexGrow={1} display={{ xs: 'none', md: 'flex' }}>
                                {links.map((page) => (
                                    <Button
                                        key={page}
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </Box>
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
`;
