import axios from "axios";

const API_URL = "http://localhost:5000/api/products/";

const addToCart = async (id: string, qty: number) => {
  const response = await axios.get(API_URL + `${id}`);
  const data = response.data;

  data.qty = qty;

  return response.data;
};

const cartService = {
  addToCart,
};

export default cartService;
