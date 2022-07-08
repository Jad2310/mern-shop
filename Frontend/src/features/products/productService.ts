import axios from "axios";

const API_URL = "http://localhost:5000/api/products/";

// Fetch all products
const getProducts = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};


// Fetch single product
const getProductDetails = async (id: string) => {
  const response = await axios.get(API_URL + `${id}`);

  return response.data;
};

// Fetch top rated products
const getTopProducts = async () => {
  const response = await axios.get(API_URL + "top/")

  return response.data
}

const productService = {
  getProducts,
  getProductDetails,
  getTopProducts
};


export default productService;
