import {createTheme} from '@mui/material';

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
    interface Theme {
    }

    interface ThemeOptions {
    }

    interface TypographyVariants {
    }

    interface TypographyVariantsOptions {
    }
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#00665E',
            dark: '#003B34',
            light: '#42948B',
            contrastText: '#BDD7D5',
        },
    },
    shape: {
        borderRadius: 8,
    },
});

theme.components = {
    ...theme.components,
};

export default theme;
