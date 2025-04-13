import React from 'react';
import Header from "./elements/header/Header";
import Home from "./pages/home/Home";
import Categories from "./pages/categories/Categories";
import AllProducts from "./pages/products/AllProducts";
import Product from "./pages/product/Product";
import Cart from "./pages/cart/Cart";
import NotFound from "./pages/notFound/NotFound";
import AllSale from "./pages/allSale/AllSale";
import Nav from './elements/nav/Nav';
import Footer from "./elements/footer/Footer";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Category from "./pages/category/Category";
import "./app.scss";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header/>
          <Nav />
              <Routes>
                  <Route path="/" index element={<Home/>} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/categories/:id" element={<Category />} />
                  <Route path="/products" element={<AllProducts />} />
                  <Route path="/product/:id" element={<Product />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="*" element={<NotFound />} />
                  <Route path="/allSale/:discount?" element={<AllSale />} />
              </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
};

export default App;

