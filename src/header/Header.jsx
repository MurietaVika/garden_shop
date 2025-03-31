import React, { useState } from 'react';
import img from "../assets/img/logo.png";
import imgCart from "../assets/img/Cart.png";
import { Link } from 'react-router-dom';
import "./header.scss";
import { useSelector } from 'react-redux';
import Container from "../components/container/Container";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const cartItems = useSelector((state) => state.cart.items);

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header>
            <Container>
                <div className="header">
            <div className="header__logo">
                <img src={img} alt="logo" />
            </div>
            <nav className={`header__nav ${isMenuOpen ? "header__nav--open" : ""}`}>
                <ul className="header__menu">
                    <li className="header__menu-item">
                        <Link to="/" className="header__menu-link" onClick={toggleMenu}>
                            <p>Main Page</p>
                        </Link>
                    </li>
                    <li className="header__menu-item">
                        <Link to="/categories" className="header__menu-link" onClick={toggleMenu}>
                            <p>Categories</p>
                        </Link>
                    </li>
                    <li className="header__menu-item">
                        <Link to="/products" className="header__menu-link" onClick={toggleMenu}>
                            <p>All products</p>
                        </Link>
                    </li>
                    <li className="header__menu-item">
                        <Link to="/allSale" className="header__menu-link" onClick={toggleMenu}>
                            <p>All sales</p>
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="header__actions">
                <div className="header__cart">
                    <Link to="/cart">
                        <img className="header__cart-icon" src={imgCart} alt="cart" />
                        {cartCount > 0 && (
                            <div className="header__cart-count">{cartCount}</div>
                        )}
                    </Link>
                </div>
                {/* Бургер-меню */}
                <div className={`header__burger ${isMenuOpen ? "header__burger--open" : ""}`} onClick={toggleMenu}>
                    <span className="header__burger-line"></span>
                    <span className="header__burger-line"></span>
                    <span className="header__burger-line"></span>
                </div>
                {/* Скрытое меню */}
                <div className={`header__side-menu ${isMenuOpen ? "header__side-menu--open" : ""}`}>
                    <ul className="header__side-menu-list">
                        <li className="header__side-menu-item">
                            <Link to="/" className="header__side-menu-link" onClick={toggleMenu}>
                                <p>Main Page</p>
                            </Link>
                        </li>
                        <li className="header__side-menu-item">
                            <Link to="/categories" className="header__side-menu-link" onClick={toggleMenu}>
                                <p>Categories</p>
                            </Link>
                        </li>
                        <li className="header__side-menu-item">
                            <Link to="/products" className="header__side-menu-link" onClick={toggleMenu}>
                                <p>All products</p>
                            </Link>
                        </li>
                        <li className="header__side-menu-item">
                            <Link to="/allSale" className="header__side-menu-link" onClick={toggleMenu}>
                                <p>All sales</p>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
                </div>
            </Container>
        </header>
    );
};

export default Header;
