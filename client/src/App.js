import ApolloProvider from './apollo/ApolloProvider';
import {BrowserRouter, Switch} from 'react-router-dom';
import {Container} from 'react-bootstrap';

import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/home/Home';

import DynamicRoute from './util/DynamicRoute';

import {AuthProvider} from './context/auth';
import {MessageProvider} from './context/message';

import './App.scss';

const App = () => {


  return (
    <ApolloProvider>
      <AuthProvider>
        <MessageProvider>
          <BrowserRouter>
            <Container className="pt-5">
              <Switch>

                <DynamicRoute exact path="/" component={Home} authenticated={true} />
                <DynamicRoute path="/register" component={Register} authenticated={false} />
                <DynamicRoute path="/login" component={Login} authenticated={false} />

              </Switch>
            </Container>
          </BrowserRouter>
        </MessageProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
