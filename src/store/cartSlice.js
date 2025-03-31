import { createSlice } from "@reduxjs/toolkit";

// Функция для загрузки корзины из localStorage при инициализации
const loadCartFromStorage = () => {
    const savedCart = localStorage.getItem("cart");// Получаем строку из localStorage
    return savedCart ? JSON.parse(savedCart) : [];// Если данные есть, парсим их, иначе возвращаем пустой массив
};


// Функция для загрузки сохранённых скидок из localStorage
const loadDiscountsFromStorage = () => {
    const savedDiscounts = localStorage.getItem("discounts"); // Получаем данные из LocalStorage
    return savedDiscounts ? JSON.parse(savedDiscounts) : []; // Парсим JSON, если данные есть, иначе возвращаем пустой массив
};


// Создаём слайс Redux для управления состоянием корзины
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: loadCartFromStorage(), // Начальное состояние — загруженная корзина
    },

    reducers: {
        // Добавление товара в корзину
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.items.find((i) => i.id === item.id); // Проверяем, есть ли товар в корзине
            const savedItem = loadDiscountsFromStorage().find((i) => i.id === item.id); // Получаем скидку, если есть

            if (existingItem) {
                // Если товар уже есть в корзине, увеличиваем его количество
                existingItem.quantity += item.quantity;
            } else {
                // Если товара нет, добавляем его в корзину
                const newItem = {
                    ...item,
                    discont_price: savedItem?.discont_price ?? item.discont_price ?? item.price, // Учитываем возможную скидку
                };
                state.items.push(newItem);
            }
            localStorage.setItem("cart", JSON.stringify(state.items)); // Обновляем localStorage
        },

        // Удаление товара из корзины по id
        removeFromCart: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
            localStorage.setItem("cart", JSON.stringify(state.items)); // Обновляем localStorage
        },

        // Уменьшение количества товара в корзине
        decreaseQuantity: (state, action) => {
            const item = state.items.find((i) => i.id === action.payload);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity--; // Уменьшаем количество
                } else {
                    state.items = state.items.filter(i => i.id !== action.payload); // Удаляем товар, если он последний
                }
                localStorage.setItem("cart", JSON.stringify(state.items)); // Обновляем localStorage
            }
        },

        // Очистка всей корзины
        clearCart: (state) => {
            state.items = [];
            localStorage.removeItem("cart"); // Удаляем корзину из localStorage
        }
    }
});

// Экспортируем экшены для использования в компонентах
export const { addToCart, removeFromCart, decreaseQuantity, clearCart } = cartSlice.actions;

// Экспортируем сам reducer для подключения в store
export default cartSlice.reducer;
//Этот код управляет корзиной покупок с использованием Redux Toolkit и сохраняет данные в localStorage.