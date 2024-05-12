import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../store/auth/authSlice";
import { useEffect } from "react";

const loginSchema = object().shape({
  email: string().email("Invalid email").required("Required"),
  password: string().min(6, "Too Short!").required("Required"),
});

const initialFormValues = { email: "", password: "" };

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status: authStatus, error: authError } = useSelector(
    (state) => state.auth
  );
  const errorField = authError?.errors?.[0]?.errorField ?? "";
  const errorMessage = authError?.errors?.[0]?.errorMessage ?? "";

  const handleLogin = (values) => {
    dispatch(login(values));
  };

  useEffect(() => {
    if (authStatus === "success") {
      navigate("/");
    }
  }, [authStatus]);

  const resetAuth = () => dispatch(reset());

  return (
    <>
      <Container className="d-flex justify-content-center p-4">
        <Card style={{ width: "18rem" }}>
          <Card.Header>Login</Card.Header>
          <Card.Body>
            <Formik
              initialValues={initialFormValues}
              validationSchema={loginSchema}
              onSubmit={(values) => handleLogin(values)}
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
                      {authStatus === "loading" ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        <span>Submit</span>
                      )}
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
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal show={authStatus === "failed"} onHide={resetAuth}>
          <Modal.Header closeButton>
            <Modal.Title>Login Failed</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {errorField === "email" && (
              <div>
                <p>{errorMessage}</p>
                <p>
                  Please check your email. New User?{" "}
                  <Link to={"/register"}>Register</Link>
                </p>
              </div>
            )}
            {errorField === "password" && (
              <div>
                <p>{errorMessage}</p>
                <p>Wrong Password</p>
              </div>
            )}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={resetAuth}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Login;
