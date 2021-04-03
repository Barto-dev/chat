import {Container} from 'react-bootstrap';
import ApolloProvider from './apollo/ApolloProvider';
import Register from './pages/Register';

import './App.scss';

const App = () => {


  return (
    <ApolloProvider>
      <Container className="pt-5">
        <Register />
      </Container>
    </ApolloProvider>
  );
}

export default App;
