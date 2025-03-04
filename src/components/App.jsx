import React from 'react';
import Header from "./header/Header";
import Home from "./home/Home";
import Categories from "./categories/Categories";
import AllProducts from "./products/AllProducts";
import Product from "./products/Product";
import Cart from "./cart/Cart";
import NotFound from "./notFound/NotFound";
import AllSale from "./allSale/AllSale";
import Nav from './../nav/Nav';
import Footer from "./../footer/Footer";
import "./app.scss";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <BrowserRouter> 
        <Nav/>
        <Header/>
        <Routes> 
            <Route path="/" index element={<Home/>} />
            <Route path="/categories" element={<Categories />} /> 
            <Route path="/products" element={<AllProducts />} />
            <Route path="/products" element={<Product />} /> 
            <Route path="/cart" element={<Cart />} />
            <Route path="/notFound" element={<NotFound />} /> 
            <Route path="/allSale" element={<AllSale />} /> 
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
};

export default App;
