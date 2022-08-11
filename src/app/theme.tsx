import { createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#00665E',
            dark: '#003B34',
            light: '#42948B',
            contrastText: '#fff',
        },
    },
    shape: {
        // borderRadius: 0,
    },

    typography: {
        fontFamily: 'Titillium Web, Lora, sans-serif',
        h5: {
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '40px',
            letterSpacing: '0.002em',
        },
        h4: {
            fontWeight: 500,
            fontSize: '34px',
        },
        h3: {
            fontWeight: 500,
            lineHeight: '72px',
        },
        button: {
            fontWeight: 400,
            fontSize: '16px',
            textTransform: 'none',
        },
        body1: {
            fontStyle: 'normal',
            fontWeight: 'normal',
            lineHeight: '24px',
            letterSpacing: '0.005em',
        },
    },
});

theme.components = {
    ...theme.components,
    MuiButton: {
        variants: [
            {
                props: { variant: 'contained' },
                style: {
                    boxShadow: 'none',
                    borderRadius: '2px',
                    disableElevation: true,
                },
            },
            {
                props: { variant: 'outlined' },
                style: {
                    boxShadow: 'none',
                    borderRadius: '2px',
                },
            },
        ],
    },
};

export default theme;
