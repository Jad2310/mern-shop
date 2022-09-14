import { useEffect } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout, searchLocalStorage } from "../features/user/userSlice";

function Header() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(searchLocalStorage());
  }, []);

  const userState = useAppSelector((state) => state.users.userLogin);
  const { user } = userState;

  const logoutHandler = () => {
    console.log("Logout");
    dispatch(logout());
  };

  return (
    <Navbar className="mb-4 py-3" bg="dark" variant="dark" expand="md">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>MERN - Shop</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav>
            <LinkContainer to="/cart">
              <Nav.Link className="me-3">
                <i className="fas fa-shopping-cart me-2"></i>Cart
              </Nav.Link>
            </LinkContainer>
            {user === null ? (
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fas fa-user me-2"></i>Sign In
                </Nav.Link>
              </LinkContainer>
            ) : (
              <NavDropdown title={user.name} id="username">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
