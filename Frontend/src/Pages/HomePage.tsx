import React from "react";
import { Header, Slider, Product } from "../components";
import { Container, Row } from "react-bootstrap";

function HomePage() {
  return (
    <div className="App">
      <Header />

      <Container className="">
        <Slider />
        <h1 className="text-uppercase mt-5 mb-3">Latest Products</h1>

        <Row className="g-4 justify-content-center">
          {Array.from({ length: 5 }).map((_, _idx) => (
            <Product
              image="/images/airpods.jpg"
              title="Airpods"
              rating={4.5}
              price={200}
              reviews={45}
            />
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;
