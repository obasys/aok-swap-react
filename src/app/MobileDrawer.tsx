import React, { FC } from 'react';
import { Container, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import styled from 'styled-components';
import { MdOutlineClose } from 'react-icons/md';
import { Link } from 'react-router-dom';

interface Props {
    className?: string;
    isDrawerOpened: boolean;
    setIsDrawerOpened: (arg1: boolean) => void;
}

const MobileDrawer: FC<Props> = ({ className, isDrawerOpened, setIsDrawerOpened }) => {
    const onClose = () => setIsDrawerOpened(false);

    return (
        <Drawer
            anchor="top"
            open={isDrawerOpened}
            className={className}
            onClose={onClose}
            PaperProps={{ className: 'paper' }}
        >
            <Container>
                <div className="close-box">
                    <IconButton color="inherit" size="large" onClick={onClose}>
                        <MdOutlineClose size={24} />
                    </IconButton>
                </div>
            </Container>
            <List className="mobile-list">
                <ListItem className="link">
                    <ListItemButton onClick={onClose} component={Link} to="/">
                        <ListItemText
                            className="link-text"
                            primary={
                                <Typography variant="h6" textTransform="uppercase">
                                    AOK Swap
                                </Typography>
                            }
                        />
                    </ListItemButton>
                </ListItem>
                <ListItem className="link">
                    <ListItemButton onClick={onClose} component={Link} to="/history">
                        <ListItemText
                            className="link-text"
                            primary={
                                <Typography variant="h6" textTransform="uppercase">
                                    History
                                </Typography>
                            }
                        />
                    </ListItemButton>
                </ListItem>
                <ListItem className="link">
                    <ListItemButton onClick={onClose} component={Link} to="/deposit">
                        <ListItemText
                            className="link-text"
                            primary={
                                <Typography variant="h6" textTransform="uppercase">
                                    Deposit
                                </Typography>
                            }
                        />
                    </ListItemButton>
                </ListItem>
                <ListItem className="link">
                    <ListItemButton>
                        <ListItemText
                            className="link-text"
                            primary={
                                <Typography variant="h6" textTransform="uppercase">
                                    Log Out
                                </Typography>
                            }
                        />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
};

export default styled(MobileDrawer)`
    .mobile-list {
        color: ${({ theme }) => theme.palette.common.white};
    }

    .link-text {
        display: flex;
        justify-content: center;
    }

    .paper {
        height: 100%;
        background: ${({ theme }) => theme.palette.primary.main};
    }

    .close-box {
        display: flex;
        justify-content: flex-end;
        height: 75px;
        color: ${({ theme }) => theme.palette.common.white};
    }
`;
