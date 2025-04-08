import React from 'react';
import { Link } from 'react-router-dom';
import './nav.scss';  
import Breadcrumbs from "./Breadcrumbs";

const Nav = () => {
    return (
        <div className="nav_container">
            <Breadcrumbs />
            <nav className='hidden'>
                <Link to="/" className="nav_link">Home</Link>
                <Link to="/container" className="nav_link">Container</Link>
                <Link to="/header" className="nav_link">Header</Link>
                <Link to="/categories" className="nav_link">Categories</Link>
                <Link to="/category" className="nav_link">Category</Link>
                <Link to="/products" className="nav_link">Products</Link>
                <Link to="/product" className="nav_link">Product</Link>
                <Link to="/cart" className="nav_link">Cart</Link>
                <Link to="/notFound" className="nav_link">Not Found</Link>
                <Link to="/allSale" className="nav_link">All Sales</Link>
                <Link to="/footer" className="nav_link">Footer</Link>
                <Link to="/products/all?discount=true" className="nav_link"><p>Products on Sale</p></Link>
            </nav>
        </div>
    );
};

export default Nav;
