import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  HomePage,
  CartPage,
  ProductPage,
  LoginPage,
  RegisterPage,
} from "./Pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import { Header } from "./components";

function App() {
  return (
    <>
      <Router>
        <Header />
        <main className="py-3">
          <Routes>
            <Route path="/">
              <Route index element={<HomePage />} />
              <Route path="cart">
                <Route index element={<CartPage />} />
                <Route path=":id" element={<CartPage />} />
              </Route>
              <Route path="product/:id" element={<ProductPage />} />
              <Route path="login/" element={<LoginPage />} />
              <Route path="register/" element={<RegisterPage />} />
            </Route>
          </Routes>
        </main>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
