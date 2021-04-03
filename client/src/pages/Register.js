import {useState} from 'react';
import {Row, Col, Form, Button} from 'react-bootstrap';
import {gql, useMutation} from '@apollo/client';

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!) {
        register(
            username: $username,
            email: $email,
            password: $password,
            confirmPassword: $confirmPassword) {
            username
            email
            createdAt
        }
    }
`;

const Register = () => {

  const [variables, setVariables] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({})

  const [registerUser, {loading}] = useMutation(REGISTER_USER, {
    update(_, res) {
      console.log(res);
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.errors);
      setErrors(err.graphQLErrors[0].extensions.errors);
    }
  });

  const submitRegisterForm = (evt) => {
    evt.preventDefault();
    registerUser({variables})
  }

  const onChangeInput = (evt) => {
    setVariables({
      ...variables,
      [evt.target.name]: evt.target.value
    })
  }

  return (
    <Row className="bg-white py-5 justify-content-center">
      <Col sm={8} md={6} lg={4}>
        <h1 className="text-center">Register</h1>
        <Form onSubmit={submitRegisterForm}>
          <Form.Group>
            <Form.Label className={errors.email && 'text-danger'}>
              {errors.email ?? 'Email address'}
            </Form.Label>
            <Form.Control type="email"
                          name="email"
                          className={errors.email && 'is-invalid'}
                          value={variables.email}
                          onChange={onChangeInput}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className={errors.username && 'text-danger'}>
              {errors.username ?? 'Username'}
            </Form.Label>
            <Form.Control type="text"
                          name="username"
                          className={errors.username && 'is-invalid'}
                          value={variables.username}
                          onChange={onChangeInput} />
          </Form.Group>
          <Form.Group>
            <Form.Label className={errors.password && 'text-danger'}>
              {errors.password ?? 'Password address'}
            </Form.Label>
            <Form.Control type="password"
                          name="password"
                          className={errors.password && 'is-invalid'}
                          value={variables.password}
                          onChange={onChangeInput} />
          </Form.Group>
          <Form.Group>
            <Form.Label className={errors.confirmPassword && 'text-danger'}>
              {errors.confirmPassword ?? 'Confirm password'}
            </Form.Label>
            <Form.Control type="password"
                          name="confirmPassword"
                          className={errors.confirmPassword && 'is-invalid'}
                          value={variables.confirmPassword}
                          onChange={onChangeInput} />
          </Form.Group>
          <div className="text-center">
            <Button variant="success" type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Register'}
            </Button>
          </div>

        </Form>
      </Col>
    </Row>
  );
};

export default Register;
