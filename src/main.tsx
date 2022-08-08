import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { SnackbarProvider } from 'notistack';
import ReportSuccess from './components/ReportSuccess';

declare module 'notistack' {
    interface VariantOverrides {
        reportSuccess: true;
    }
}

ReactDOM.render(
    <React.StrictMode>
        <SnackbarProvider
            Components={{
                reportSuccess: ReportSuccess,
            }}
        >
            <App />
        </SnackbarProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);
