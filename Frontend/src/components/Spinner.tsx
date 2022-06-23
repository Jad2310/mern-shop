import { Container, Spinner } from "react-bootstrap";

function SpinnerComponent() {
  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center">
      <Spinner
        animation="border"
        role="status"
        style={{ width: "4rem", height: "4rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>
  );
}

export default SpinnerComponent;
