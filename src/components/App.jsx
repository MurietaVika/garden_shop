import React from 'react';
import Header from "./../header/Header";
import Home from "./home/Home";
import Categories from "./categories/Categories";
import AllProducts from "./products/AllProducts";
import Product from "./product/Product";
import Cart from "./cart/Cart";
import NotFound from "./notFound/NotFound";
import AllSale from "./allSale/AllSale";
import Nav from './../nav/Nav';
import Footer from "./../footer/Footer";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Category from "./category/Category";
import EmptyCart from "./cart/EmptyCart";

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

