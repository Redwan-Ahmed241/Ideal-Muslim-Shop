import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext(null);

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map(item =>
                        item.id === action.payload.id
                            ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
                            : item
                    )
                };
            }
            return {
                ...state,
                items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }]
            };
        }
        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload.id)
            };
        case 'UPDATE_QUANTITY':
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: Math.max(1, action.payload.quantity) }
                        : item
                )
            };
        case 'CLEAR_CART':
            return { ...state, items: [] };
        default:
            return state;
    }
};

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, { items: [] }, (initial) => {
        try {
            const local = localStorage.getItem('im_cart');
            return local ? JSON.parse(local) : initial;
        } catch {
            return initial;
        }
    });

    useEffect(() => {
        localStorage.setItem('im_cart', JSON.stringify(state));
    }, [state]);

    const addToCart = (product, quantity = 1) => dispatch({ type: 'ADD_ITEM', payload: { ...product, quantity } });
    const removeFromCart = (id) => dispatch({ type: 'REMOVE_ITEM', payload: { id } });
    const updateQuantity = (id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    const clearCart = () => dispatch({ type: 'CLEAR_CART' });

    const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = state.items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            cartItems: state.items,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            totalItems,
            totalPrice
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within CartProvider');
    return context;
};
