import { useEffect } from "react";
import { Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getTopProducts,
  resetProduct,
} from "../features/products/productSlice";
import Spinner from "./Spinner";

function Slider() {
  const dispatch = useAppDispatch();

  const productsTopRated = useAppSelector((state) => state.products.top);
  const { product, isError, isLoading, message } = productsTopRated;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTopProducts());

    return () => {
      dispatch(resetProduct());
    };
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Carousel className="bg-dark m-auto mt-4" pause="hover">
      {product.map((item) => (
        <Carousel.Item key={item._id}>
          <Link to={`/product/${item._id}`}>
            <Image src={item.image} alt={item.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>{item.name}</h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Slider;
