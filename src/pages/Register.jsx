import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { object, string } from "yup";
import { register } from "../features/register";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/auth/authSlice";
import { useEffect } from "react";

const registerSchema = object().shape({
  name: string().required("Required"),
  phone: string()
    .length(10, "Please enter a valid phone number")
    .required("Required"),
  email: string().email("Invalid email").required("Required"),
  password: string().min(6, "Too Short!").required("Required"),
});

const initialFormValues = { name: "", email: "", phone: "", password: "" };

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);

  const handleRegister = async (values) => {
    const { name, email, phone, password } = values;
    const res = await register({ name, email, phone, password, role: "USER" });
    if (res.status === 200) {
      dispatch(login({ email, password }));
    }
  };

  useEffect(() => {
    if (authStatus === "success") {
      navigate("/");
    }
  }, [authStatus]);
  return (
    <Container className="d-flex justify-content-center p-4">
      <Card style={{ width: "25rem" }}>
        <Card.Header>Register</Card.Header>
        <Card.Body>
          <Formik
            initialValues={initialFormValues}
            validationSchema={registerSchema}
            onSubmit={(values) => handleRegister(values)}
          >
            {({ errors, handleChange, handleSubmit, values, touched }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="First and Last name"
                    value={values.name}
                    onChange={handleChange}
                    isValid={touched.name && !errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
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
                <Form.Group className="mb-3" controlId="phone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="phone"
                    placeholder="Phone Number"
                    value={values.phone}
                    onChange={handleChange}
                    isInvalid={errors.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="At least 6 characters"
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={errors.password}
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
              </Form>
            )}
          </Formik>
        </Card.Body>
        <Card.Footer className="text-muted">
          Already a User? <Link to={"/login"}>Login</Link>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default Register;
