import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Container,
  Card,
  FormSelect,
  Button,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Rating } from "../components";
import SpinnerComponent from "../components/Spinner";
import { toast } from "react-toastify";

import { addToCart, resetCart } from "../features/cart/cartSlice";
import {
  getProductDetails,
  resetProduct,
} from "../features/products/productSlice";

function ProductPage() {
  const { id } = useParams();
  const [qty, setQty] = useState(1);

  const dispatch = useAppDispatch();

  const productDetails = useAppSelector((state) => state.products.product);
  const cart = useAppSelector((state) => state.cart);

  const { product, isLoading, isError, message } = productDetails;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (cart.isError) {
      toast.error(cart.message);
    }

    if (cart.isSuccess) {
      toast.success("Product added to Cart");
    }

    if (!product?._id || product._id !== id) {
      dispatch(getProductDetails(id!));
    }
    return () => {
      dispatch(resetProduct());
      dispatch(resetCart());
    };
  }, [isError, cart]);

  if (isLoading) {
    return <SpinnerComponent />;
  }

  if (!id) {
    return <h3>No id</h3>;
  }

  return (
    <>
      <Container fluid>
        <Link className="btn btn-light my-3" to="/">
          Go back
        </Link>
        <Row className="justify-content-center g-4">
          <Col sm={10} md={6} lg={4}>
            <Image src={product?.image} alt={product?.name} fluid />
          </Col>
          <Col md={5} lg={4}>
            <ListGroup variant="flush">
              <ListGroup.Item className="text-uppercase fs-1">
                {product?.name}
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product?.rating}
                  text={`${product?.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product?.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {product?.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col lg={2}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product?.price && product.price * qty}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product?.countInStock && product.countInStock > 0
                        ? "In Stock"
                        : "Out Of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Qty:</Col>
                    <Col>
                      <FormSelect
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(parseInt(e.target.value))}
                        disabled={product && product.countInStock === 0}
                      >
                        {[...Array(product?.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </FormSelect>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    className="w-100 py-2 my-2"
                    variant="dark"
                    disabled={product && product.countInStock === 0}
                    onClick={() => {
                      dispatch(addToCart({ id, qty }));
                    }}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
        <h2 className="mt-5 mb-3 text-decoration-underline">REVIEWS</h2>
        <Container fluid>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h6>Jane Doe</h6>
              <Rating value={4.5} />
              <p>These are great headphones!</p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h6>Jane Doe</h6>
              <Rating value={4.5} />
              <p>These are great headphones!</p>
            </ListGroup.Item>
          </ListGroup>
        </Container>
      </Container>
    </>
  );
}

export default ProductPage;
