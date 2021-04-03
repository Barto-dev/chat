import ApolloProvider from './apollo/ApolloProvider';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Container} from 'react-bootstrap';

import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';

import './App.scss';

const App = () => {


  return (
    <ApolloProvider>
      <BrowserRouter>
        <Container className="pt-5">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
          </Switch>
        </Container>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
