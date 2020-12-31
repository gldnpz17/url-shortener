import logo from './logo.svg';
import './App.css';
import styled, { ThemeProvider } from 'styled-components';
import { Container } from 'react-bootstrap';
import HomePage from './pages/HomePage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RedirectPage from './pages/RedirectPage';

const theme = {
  primary: "#00bfa5",
  primaryLight: "#5df2d6",
  primaryDark: "#008e76",
  textOnPrimary: "#000000",
  secondary: "#00b8d4",
  secondaryLight: "#62ebff",
  secondaryDark: "#0088a3",
  textOnSecondary: "#000000"
}

function App() {
  return (
    <Container fluid className="min-vh-100 vh-100 p-0">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>

            <Route path="/:shortName">
              <RedirectPage />
            </Route>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </Container>
  );
}

export default App;
