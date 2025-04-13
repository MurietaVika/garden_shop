import React, { useState } from "react";
import "./cart.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { decreaseQuantity, addToCart, removeFromCart } from "../../../features/cartSlice";
import Container from "../../elements/container/Container";
import EmptyCart from "./EmptyCart";

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        phone: '',
        email: ''
    });
    if (cartItems.length === 0) {
        return <EmptyCart />;
    }

    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const total = cartItems.reduce((sum, item) => sum + (item.discont_price || item.price) * item.quantity, 0);


    const validateForm = () => {
        let valid = true;
        let newErrors = { name: '', phone: '', email: '' };

        if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters long';
            valid = false;
        }

        if (!/^\+?\d{10,15}$/.test(formData.phone)) {
            newErrors.phone = 'Enter a valid phone number';
            valid = false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Enter a valid email';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsModalOpen(true);
            console.log('Form submitted:', formData);
        }
    };

    return (
        <div className="cart-container">
            <Container>
                <div className="cart-header">
                    <h3 className="cart-title">Shopping Cart</h3>
                    <div className="cart-navigation">
                        <hr className="cart-divider" />
                        <button className="cart-back-button" onClick={() => navigate("/")}>
                            Back to the store
                        </button>
                    </div>
                </div>
                <div className="cart-page">
                    <div className="cart-content">
                        {cartItems.map((item) => (
                            <div className="cart-item" key={item.id}>
                                <div className="cart-item-image">
                                    <img src={`http://localhost:3333${item.image}`} alt={item.title} />
                                </div>
                                <div className="cart-item-wrapper">
                                    <div className="cart-item-info">
                                        <div className="cart-item-title">
                                            <strong>{item.title}</strong>
                                        </div>
                                        <div className="cart-remove-button">
                                            <button className="cart-remove-cross" onClick={() => dispatch(removeFromCart(item.id))}>
                                                ✖
                                            </button>
                                        </div>
                                    </div>
                                    <div className="cart-item-details">
                                        <div className="cart-quantity-control">
                                            <button className="quantity-decrease" onClick={() => dispatch(decreaseQuantity(item.id))}>
                                                -
                                            </button>
                                            <span className="quantity-value">{item.quantity}</span>
                                            <button className="quantity-increase" onClick={() => dispatch(addToCart({ ...item, quantity: 1 }))}>
                                                +
                                            </button>
                                        </div>
                                        <div className="cart-item-price">
                                            {item.discont_price && item.discont_price !== item.price ? (
                                                <>
                                                    <span className="price-new">${item.discont_price}</span>
                                                    <span className="price-old">${item.price}</span>
                                                </>
                                            ) : (
                                                <span className="regular">${item.price}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-discount-form">
                        <div className="cart-discount-details">
                            <h1>Order details</h1>
                            <button className="total-quantity-btn">{totalQuantity} items</button>
                            <div className="total-text">
                                <h2>Total</h2>
                                <span className="total-value">${total}</span>
                            </div>
                        </div>
                        <form className="discount-form" onSubmit={handleSubmit}>
                            <input
                                className={`form-input ${errors.name ? "error-input" : ""}`}
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {errors.name && <p className="error-text">{errors.name}</p>}

                            <input
                                className={`form-input ${errors.phone ? "error-input" : ""}`}
                                type="tel"
                                name="phone"
                                placeholder="Phone number"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                            {errors.phone && <p className="error-text">{errors.phone}</p>}

                            <input
                                className={`form-input ${errors.email ? "error-input" : ""}`}
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <p className="error-text">{errors.email}</p>}

                            <button className="form-submit" type="submit" disabled={Object.values(errors).some(err => err)}>
                                Order
                            </button>
                        </form>
                        {isModalOpen && (
                            <div className="modal">
                                <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
                                <h3>Congratulations!</h3>
                                <p>Your order has been successfully placed.</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="cart-navigation-back">
                    <button className="cart-back-button" onClick={() => navigate("/")}>
                        Back to the store
                    </button>
                </div>
            </Container>

            {isModalOpen && (
                <>
                    <div className="overlay" onClick={() => setIsModalOpen(false)}></div>
                    <div className="modal">
                        <span className="close" onClick={() => setIsModalOpen(false)}>
                            &times;
                        </span>
                        <h3>Congratulations!</h3>
                        <p>
                            Your order has been successfully placed on the website.
                            <br />
                            <br />
                            A manager will contact you shortly to confirm your order.
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
