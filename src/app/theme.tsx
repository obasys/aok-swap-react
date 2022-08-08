import { createTheme } from '@mui/material';

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        framed: true;
        confirm: true;
    }
}

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        buttonLg: true;
        title: true;
        h7: true;
    }
}

declare module '@mui/material/styles' {
    interface Theme {}

    interface ThemeOptions {}

    interface TypographyVariants {}

    interface TypographyVariantsOptions {}
}

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
