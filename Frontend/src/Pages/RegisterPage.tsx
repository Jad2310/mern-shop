import { useEffect, useState } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import SpinnerComponent from "../components/Spinner";
import { userRegister } from "../features/user/userSlice";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const dispatch = useAppDispatch();
  const registerState = useAppSelector((state) => state.users.userRegister);

  const navigate = useNavigate();

  const { user, isLoading } = registerState;

  useEffect(() => {
    if (user !== null) {
      navigate("/");
    }
  });
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match");
      setPassword("");
      setPassword2("");
    } else {
      dispatch(userRegister({ name, email, password }));
    }
  };

  if (isLoading) {
    return <SpinnerComponent />;
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <h2 className="text-uppercase">Register</h2>
        <Col xs={12} xl={6}>
          <Card className="mb-5">
            <Card.Body className="d-flex flex-column align-items-center">
              <Form onSubmit={(e) => submitHandler(e)}>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword2">
                  <Form.Label>Retype Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Retype Password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button className="my-3 w-100" variant="dark" type="submit">
                  Submit
                </Button>
              </Form>
              <Row className="my-3 justify-content-start">
                <Col>
                  Have an account? <Link to="/login">Login</Link>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterPage;
