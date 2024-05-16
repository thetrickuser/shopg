import Form from "react-bootstrap/Form";
import {
  Container,
  Row,
  Col,
  Dropdown,
  ButtonGroup,
  Button,
  InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/auth/authSlice";
import { LuUserCircle2 } from "react-icons/lu";
import { BsCart, BsSearch } from "react-icons/bs";
import { useState } from "react";

const Header = () => {
  const { user: authUser, status: authStatus } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  return (
    <Container fluid className="p-2">
      <Row className="d-flex align-items-center">
        <Col md={2} className="text-center fs-5 fw-bold justify-content-center">
          ShopG
        </Col>
        <Col md={7}>
          <Form>
            <InputGroup className="d-flex justify-content-center">
              <InputGroup.Text className="rounded-start-5 bg-white fs-5">
                <BsSearch />
              </InputGroup.Text>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 rounded-end-5 fs-5"
                aria-label="Search"
              />
            </InputGroup>
          </Form>
        </Col>
        <Col md={3} className="d-flex justify-content-end">
          <Dropdown as={ButtonGroup}>
            <Button
              className="bg-white text-dark border-0"
              as={Link}
              to={"/login"}
            >
              <div className="d-flex align-items-center gap-1 fs-5">
                <span>
                  <LuUserCircle2 size={30} />
                </span>
                {authUser ? <span>{authUser.name}</span> : <span>Login</span>}
              </div>
            </Button>
            <Dropdown.Toggle
              className="bg-white text-dark border-0"
              id="dropdown-split-basic"
            />

            <Dropdown.Menu>
              <Dropdown.Item>
                {authStatus === "success" ? (
                  <Button
                    className="bg-white text-dark border-0"
                    onClick={() => dispatch(logout())}
                  >
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
          <Button className="bg-white text-dark border-0">
            <div className="d-flex align-items-center gap-1">
              <span>
                <BsCart size={25} />
              </span>
              <span className="fs-5">Cart</span>
            </div>
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
