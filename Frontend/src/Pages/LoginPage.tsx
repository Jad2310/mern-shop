import { useEffect, useState } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Card,
  Alert,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import SpinnerComponent from "../components/Spinner";
import { userLogin } from "../features/user/userSlice";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.users.userLogin);

  const navigate = useNavigate();

  const { user, isError, isLoading, message } = userState;

  useEffect(() => {
    if (isError) {
      setError(message);
      toast.error(message);
    }
    if (user !== null) {
      navigate(`/`);
    }
  }, [isError, user, message]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(userLogin({ email, password }));
  };

  if (isLoading) {
    return <SpinnerComponent />;
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <h2>SIGN IN</h2>
        <Col xs={12} xl={6}>
          {isError ? <Alert variant="danger">{error}</Alert> : <></>}
          <Card className="mb-5">
            <Card.Body className="d-flex flex-column align-items-center">
              <Form onSubmit={(e) => submitHandler(e)}>
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
