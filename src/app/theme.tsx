import { createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#6C82CF',
            dark: '#485892',
            light: '#42948B',
            contrastText: '#BDD7D5',
        },
    },
    shape: {
        borderRadius: 0,
    },
    typography: {
        fontFamily: "'Lato', sans-serif",
    },
});

theme.components = {
    ...theme.components,
};

export default theme;
