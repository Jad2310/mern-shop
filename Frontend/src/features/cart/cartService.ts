import axios from "axios";

const API_URL = "http://localhost:5000/api/products/";

const addToCart = async (id: string, qty: number) => {
  const response = await axios.get(API_URL + `${id}`);
  const data = response.data;

  data.qty = qty;

  return data;
};

const removeFromCart = async (id: string) => {
  const response = await axios.get(API_URL + `${id}`);

  return response.data;
};

const cartService = {
  addToCart,
  removeFromCart
};

export default cartService;
