import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './product.scss';

const Product = () => {
    const { id } = useParams(); // Получаем ID продукта из URL
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3333/products/${id}`);
                const data = await response.json();
                setItem(data);
            } catch (error) {
                console.error('Ошибка загрузки продукта:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!item) {
        return <p>Product not found</p>;
    }

    return (
        <div className="product">
            <div className="product__item">
                <div className="product__image">
                    <img src={item.img} alt={item.name} />
                </div>
            </div>
            <div className="product__details">
                <div className="product__info">
                    <strong>{item.name}</strong>
                    <div>{item.price}₽</div>
                </div>
                <div className="product__controls">
                    <button className="product__quantity-btn">
                        <span className="product__minus">-</span>
                        <span className="product__quantity">{item.quantity}</span>
                        <span className="product__plus">+</span>
                    </button>
                    <button className="product__add-to-cart-btn">Add to cart</button>
                </div>
            </div>
            <div className="product__description">
                <strong>{item.name}</strong>
                <p>{item.description}</p>
                <button className="product__read-more-btn">Read more</button>
            </div>
        </div>
    );
};

export default Product;
