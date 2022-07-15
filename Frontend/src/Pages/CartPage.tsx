import { useEffect } from "react";
import {
  Col,
  ListGroup,
  Row,
  Image,
  Form,
  Button,
  Card,
  Container,
} from "react-bootstrap";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addToCart, removeFromCart, getCart } from "../features/cart/cartSlice";

function CartPage() {
  const [searchParams, _setSearchParams] = useSearchParams();

  const { id } = useParams();
  const qty = searchParams.get("qty") ? Number(searchParams.get("qty")) : 1;

  const dispatch = useAppDispatch();

  const cart = useAppSelector((state) => state.cart);
  const { cartElements } = cart;

  useEffect(() => {
    dispatch(getCart());
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(addToCart({ id, qty }));
    }
  }, [id]);

  const removeFromCartHandler = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const updateProductHandler = (id: string, qty: number) => {
    dispatch(addToCart({ id, qty }));
  };

  return (
    <Container>
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartElements.length === 0 ? (
            <h3>Your cart is Empty</h3>
          ) : (
            <ListGroup variant="flush">
              {cartElements.map((product) => (
                <ListGroup.Item key={product._id}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${product._id}`}>{product.name}</Link>
                    </Col>
                    <Col md={2}>${product.price}</Col>
                    <Col md={2}>
                      <Form.Select
                        as="select"
                        value={product.qty}
                        onChange={(e) =>
                          updateProductHandler(
                            product._id,
                            Number(e.target.value)
                          )
                        }
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
                        onClick={() => removeFromCartHandler(product._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  Subtotal (
                  {cartElements.reduce((acc, product) => acc + product.qty!, 0)}
                  ) items
                </h2>
                <span>
                  ${" "}
                  {cartElements.reduce(
                    (acc, product) => acc + product.qty! * product.price,
                    0
                  )}
                </span>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  onClick={() => console.log("Checkout!!")}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CartPage;
