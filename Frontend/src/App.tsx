import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage, CartPage, ProductPage } from "./Pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="cart">
              <Route index element={<CartPage />} />
              <Route path=":id" element={<CartPage />} />
            </Route>
            <Route path="product/:id" element={<ProductPage />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
