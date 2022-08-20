import { Col, Container, Row } from "react-bootstrap";

function Footer() {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">Copyright &copy; MernShop</Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
