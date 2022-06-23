import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

interface IProps {
  product: IProduct;
}

function Product(props: IProps) {
  const { _id, image, name, rating, numReviews, price } = props.product;
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${_id}`}>
        <Card.Img src={image} variant="top" />
      </Link>

      <Card.Body>
        <Link
          to={`/product/${_id}`}
          style={{ color: "black", textDecoration: "none" }}
        >
          <Card.Title as="div">
            <h5>{name}</h5>
          </Card.Title>
        </Link>

        <Card.Text className="my-3" as="div">
          <Rating value={rating} text={`${numReviews} reviews`} />
        </Card.Text>

        <Card.Text className="mt-1" as="h5">
          Price: ${price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
