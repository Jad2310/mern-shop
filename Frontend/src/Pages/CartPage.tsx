import {
  Col,
  ListGroup,
  Row,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { Header } from "../components";
//import useRandProduct from "../utils/useRandProduct";
import Products from "../../../Backend/data/products";
import { Link } from "react-router-dom";
import { useState } from "react";

function CartPage() {
  const product = Products[1];
  const [qty, setQty] = useState(1);

  return (
    <>
      <Header />
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col md={2}>
                  <Image src={product.image} alt={product.name} fluid rounded />
                </Col>
                <Col md={3}>
                  <Link to={`/products/${product._id}`}>{product.name}</Link>
                </Col>
                <Col md={2}>${product.price}</Col>
                <Col md={2}>
                  <Form.Select
                    as="select"
                    value={qty}
                    onChange={(e) => setQty(parseInt(e.target.value))}
                    disabled={product && product.countInStock === 0}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={2}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => console.log("Delete!!")}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Subtotal ({qty}) items</h2>${qty * product.price}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={product && product.countInStock === 0}
                  onClick={() => console.log("Checkout!!")}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default CartPage;
