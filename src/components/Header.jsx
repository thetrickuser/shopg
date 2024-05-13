import Form from "react-bootstrap/Form";
import {
  Container,
  Row,
  Col,
  Dropdown,
  ButtonGroup,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/auth/authSlice";

const Header = () => {
  const { user: authUser, status: authStatus } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  return (
    <Container fluid className="bg-body-tertiary p-2">
      <Row className="justify-content-center align-items-center">
        <Col md={2}>ShopG</Col>
        <Col md={6}>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button>Search</Button>
          </Form>
        </Col>
        <Col md={2}>
          <Dropdown as={ButtonGroup}>
            <Button variant="success" as={Link} to={"/login"}>
              {authUser ? <span>{authUser.name}</span> : <span>Login</span>}
            </Button>
            <Dropdown.Toggle
              split
              variant="success"
              id="dropdown-split-basic"
            />

            <Dropdown.Menu>
              <Dropdown.Item>
                {authStatus === "success" ? (
                  <Button variant="primary" onClick={() => dispatch(logout())}>
                    Logout
                  </Button>
                ) : (
                  <span>
                    New User? <Link to={"/register"}>Register</Link>
                  </span>
                )}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col md={2}>
          <Button variant="primary">Cart</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
