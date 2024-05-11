import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as yup from "yup";
import * as formik from "formik";
import axios from "axios";

const BACKEND_BASE_URL = "http://localhost:8080/api/v1";

const Login = () => {
  const { Formik } = formik;

  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Required"),
    password: yup.string().min(6, "Too Short!").required("Required"),
  });

  const login = ({ email, password }) => {
    console.log(email);
    console.log(password);

    axios
      .post(`${BACKEND_BASE_URL}/auth/login`, { email, password })
      .then((res) => console.log(res.data));
  };

  return (
    <Container className="d-flex justify-content-center p-4">
      <Card style={{ width: "18rem" }}>
        <Card.Header>Login</Card.Header>
        <Card.Body>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={schema}
            onSubmit={(values) => login(values)}
          >
            {({ errors, handleChange, handleSubmit, values, touched }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group
                  className="mb-3 position-relative"
                  controlId="email"
                >
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  className="mb-3 position-relative"
                  controlId="password"
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={errors.password}
                    isValid={touched.email && !errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="d-flex justify-content-center">
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form.Group>
                <Form.Text>
                  New User? <Link to={"/register"}>Register</Link>
                </Form.Text>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
