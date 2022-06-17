import { Col, Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

interface IProps {
  image: string;
  title: string;
  rating: number;
  reviews?: number;
  price: number;
}

function Product(props: IProps) {
  return (
    <Col>
      <Link
        to={`/product/123`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <Card className="p-3" style={{ width: "18rem" }}>
          <Card.Img src={props.image} />
          <Card.Body>
            <Card.Title as="div">
              <strong>{props.title}</strong>
            </Card.Title>
            <Card.Text>
              <Rating value={props.rating} text={`${props.reviews} reviews`} />
            </Card.Text>
            <Card.Text>Price: ${props.price}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
}

export default Product;
