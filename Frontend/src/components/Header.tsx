import { Navbar, Nav, Container } from "react-bootstrap";

function Header() {
  return (
    <Navbar className="mb-4 py-3" bg="dark" variant="dark" expand="md">
      <Container>
        <Navbar.Brand href="/">MERN - Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav>
            <Nav.Link className="me-3" href="/cart">
              <i className="fas fa-shopping-cart me-2"></i>Cart
            </Nav.Link>
            <Nav.Link href="#home">
              <i className="fas fa-user me-2"></i>Sign In
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
