import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage, CartPage, ProductPage } from "./Pages";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="product/:id" element={<ProductPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
