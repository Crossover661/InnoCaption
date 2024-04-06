import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Products from "./Products";

const Rts = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Rts;