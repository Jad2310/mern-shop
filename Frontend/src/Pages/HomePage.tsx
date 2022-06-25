import { Header, Slider, Product } from "../components";
import { Col, Container, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { getProducts, resetProduct } from "../features/products/productSlice";
import Spinner from "../components/Spinner";

function HomePage() {
  const dispatch = useAppDispatch();
  const { products, isLoading, isError, message } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    console.log("testt");
    dispatch(getProducts());

    return () => {
      dispatch(resetProduct());
    };
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Header />

      <Container className="">
        <Slider />
        <h1 className="text-uppercase mt-5 mb-3">Latest Products</h1>

        <Row>
          {products.length > 0 ? (
            products.map((product, _idx) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))
          ) : (
            <h3>No products found</h3>
          )}
        </Row>
      </Container>
    </>
  );
}

export default HomePage;
