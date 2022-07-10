import { useState } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <h2>SIGN IN</h2>
        <Col xs={12} xl={6}>
          <Card className="mb-5">
            <Card.Body className="d-flex flex-column align-items-center">
              <Form onSubmit={(e) => submitHandler(e)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button className="my-3 w-100" variant="dark" type="submit">
                  Submit
                </Button>
              </Form>
              <Row className="my-3 justify-content-start">
                <Col>
                  New Customer? <Link to="/register">Register</Link>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
