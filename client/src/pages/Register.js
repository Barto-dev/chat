import {useState} from 'react';
import {Row, Col, Form, Button} from 'react-bootstrap';

const Register = () => {

  const [variables, setVariables] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const submitRegisterForm = (evt) => {
    evt.preventDefault();
    console.log(variables)
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
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email"
                          name="email"
                          value={variables.email}
                          onChange={onChangeInput}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control type="text"
                          name="username"
                          value={variables.username}
                          onChange={onChangeInput} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password"
                          name="password"
                          value={variables.password}
                          onChange={onChangeInput} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm password</Form.Label>
            <Form.Control type="password"
                          name="confirmPassword"
                          value={variables.confirmPassword}
                          onChange={onChangeInput} />
          </Form.Group>
          <div className="text-center">
            <Button variant="success" type="submit">
              Register
            </Button>
          </div>

        </Form>
      </Col>
    </Row>
  );
};

export default Register;
