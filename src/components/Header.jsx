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

const Header = () => {
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
              Login
            </Button>
            <Dropdown.Toggle
              split
              variant="success"
              id="dropdown-split-basic"
            />

            <Dropdown.Menu>
              <Dropdown.Item>
                New User? <Link to={"/register"}>Register</Link>
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
