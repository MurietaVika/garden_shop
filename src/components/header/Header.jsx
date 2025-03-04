import React from 'react';
import img from "../../assets/img/logo.png";
import imgCart from "../../assets/img/Cart.png";
import cartCount from "../cart/Cart";
import "./header.scss";

const Header = () => {
    return (
        <div className="header_all">
            <div className='logo'>
                <img id="logo" src={img} alt="logo" />
            </div>
            <div>
            <ul class="top_line">
                <li className="main_Page">
                    <p>Main Page</p>
                </li>
                <li className="categories">
                    <p>Categories</p>
                </li>
                <li className="all_products">
                    <p>All products</p>
                </li>
                <li className="all_sales">
                    <p>All sales</p>
                </li>
                </ul>
            </div>
            <div className='numer_cart'>
                <img id='cart' src={imgCart} alt="cart" />
                <div className="cart_count">{cartCount}</div> {/* Кружочек с количеством */}
            </div>
            
        </div>
    );
};

export default Header;