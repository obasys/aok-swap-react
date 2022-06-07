import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import GlobalStyle from './GlobalStyle';
import Navigation from './Navigation';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Home } from '../pages';

const App = () => {
    return (
        <Router>
            <MuiThemeProvider theme={theme}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <GlobalStyle />
                    <Navigation />
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Redirect to="/" />
                    </Switch>
                </ThemeProvider>
            </MuiThemeProvider>
        </Router>
    );
};

export default App;
