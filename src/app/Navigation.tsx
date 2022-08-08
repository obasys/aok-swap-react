import React, { FC } from 'react';
import { AppBar, Box, Button, Container, Grid, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import styled from 'styled-components';
import Logo from '../components/assets/Group 6.svg';

interface Props {
    className?: string;
}

const pages = ['Contact us', 'Explorer', 'Log out'];

const Navigation: FC<Props> = ({ className, ...props }) => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar className={className} color="transparent" elevation={0} position="static">
            <Toolbar disableGutters className={'tool-bar'}>
                <Container>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={0}>
                        <Grid item container direction="row" alignItems="center" columnSpacing={1.5} xs md>
                            <Grid item>
                                <img src={Logo} width={52} height={46.15} />
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="a"
                                    href="/"
                                    sx={{
                                        mr: 2,
                                        display: { xs: 'none', md: 'flex' },
                                        fontFamily: 'monospace',
                                        fontWeight: 300,
                                        color: 'white',
                                        textDecoration: 'none',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    <Typography>sugar</Typography>
                                    <Typography
                                        sx={{
                                            fontWeight: 700,
                                            color: 'white',
                                        }}
                                    >
                                        bridge
                                    </Typography>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs="auto" md="auto">
                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                ></IconButton>
                                <Menu
                                    id="menu-appbar"
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
                                    {pages.map((page) => (
                                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">{page}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                            <Typography
                                variant="h5"
                                noWrap
                                component="a"
                                href=""
                                sx={{
                                    mr: 2,
                                    display: { xs: 'flex', md: 'none' },
                                    flexGrow: 1,
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                LOGO
                            </Typography>
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                {pages.map((page) => (
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
