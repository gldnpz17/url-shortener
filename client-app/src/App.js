import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import HomePage from './pages/HomePage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RedirectPage from './pages/RedirectPage';

function App() {
  return (
    <Container fluid className="min-vh-100 vh-100 p-0">
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
    </Container>
  );
}

export default App;
