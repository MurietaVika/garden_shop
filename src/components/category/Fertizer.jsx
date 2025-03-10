import React, { useState, useEffect } from 'react';
import './fertizer.scss'; // Если у тебя есть стили для этой категории

const Fertizer = () => {
    const [products, setProducts] = useState([]); // Состояние для хранения товаров
    const [loading, setLoading] = useState(true); // Состояние для отслеживания загрузки
    const [error, setError] = useState(null); // Для отслеживания ошибок

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3333/products?category=1'); // Запрос на сервер для получения товаров категории "fertizer"
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке данных');
                }
                const data = await response.json();
                setProducts(data); // Сохраняем полученные товары
            } catch (error) {
                setError(error.message); // В случае ошибки, сохраняем её сообщение
            } finally {
                setLoading(false); // Завершаем процесс загрузки
            }
        };

        fetchProducts();
    }, []); // Пустой массив зависимостей, значит, запрос выполняется один раз при монтировании компонента

    if (loading) {
        return <p>Загрузка...</p>;
    }

    if (error) {
        return <p>Ошибка: {error}</p>;
    }

    return (
        <div className="fertizer">
            <h2>Товары из категории "Fertizer"</h2>
            <div className="products-list">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <img src={product.image} alt={product.title} />
                        <h3>{product.title}</h3>
                        <p>{product.price} ₽</p>
                        <p>{product.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Fertizer;
