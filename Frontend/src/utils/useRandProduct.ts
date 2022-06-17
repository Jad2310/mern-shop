import { useState, useEffect } from "react";

export interface Product {
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
}

function useRandProduct(products: Product[]) {
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    setProduct(products[Math.floor(Math.random() * 6)]);
  }, products);

  return product;
}

export default useRandProduct;
