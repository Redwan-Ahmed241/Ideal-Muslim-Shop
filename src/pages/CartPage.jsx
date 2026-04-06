import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';

export default function CartPage() {
    const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();

    return (
        <main className="min-h-screen pt-24 pb-16 bg-surface-50">
            <div className="px-6 mx-auto max-w-7xl lg:px-8">
                <div className="flex items-center gap-3 mb-8">
                    <ShoppingBag size={28} className="text-primary-500" />
                    <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] text-surface-900">
                        Your Cart
                    </h1>
                </div>

                {cartItems.length === 0 ? (
                    <div className="py-16 text-center bg-white border shadow-sm border-surface-100 rounded-2xl">
                        <ShoppingBag size={48} className="mx-auto mb-4 text-surface-300" />
                        <h2 className="text-xl font-semibold text-surface-700">Your cart is empty</h2>
                        <p className="mt-2 mb-6 text-surface-500">Looks like you haven't added anything to your cart yet.</p>
                        <Link to="/shop">
                            <Button>Start Shopping</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Cart Items */}
                        <div className="space-y-4 lg:col-span-2">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex p-4 bg-white border border-surface-100 rounded-2xl md:p-6">
                                    <div className="w-24 h-24 bg-surface-100 rounded-xl overflow-hidden shrink-0">
                                        {item.image_url ? (
                                            <img src={`http://localhost:8000/storage/${item.image_url}`} alt={item.name} className="object-cover w-full h-full" />
                                        ) : (
                                            <div className="grid w-full h-full bg-surface-100 place-items-center"><ShoppingBag size={24} className="text-surface-300"/></div>
                                        )}
                                    </div>
                                    <div className="flex flex-col justify-between flex-grow pl-4 md:pl-6">
                                        <div className="flex justify-between">
                                            <div>
                                                <h3 className="font-semibold text-surface-900">{item.name}</h3>
                                                <p className="text-sm font-medium text-primary-600">${parseFloat(item.price).toFixed(2)}</p>
                                            </div>
                                            <button 
                                                onClick={() => removeFromCart(item.id)}
                                                className="p-2 text-red-400 transition-colors rounded-lg hover:bg-red-50 hover:text-red-600"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-4 mt-4">
                                            <div className="flex items-center border rounded-lg border-surface-200">
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 text-surface-500 hover:text-primary-600 disabled:opacity-50" disabled={item.quantity <= 1}><Minus size={14}/></button>
                                                <span className="w-8 text-sm font-medium text-center text-surface-900">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 text-surface-500 hover:text-primary-600"><Plus size={14}/></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="p-6 bg-white border shadow-sm border-surface-100 rounded-2xl sticky top-24">
                                <h2 className="mb-4 text-xl font-semibold text-surface-900">Order Summary</h2>
                                
                                <div className="space-y-3 text-sm text-surface-600">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span className="font-medium text-surface-900">${totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping (Cash on Delivery)</span>
                                        <span className="font-medium text-surface-900">$5.00</span>
                                    </div>
                                    <hr className="my-4 border-surface-100" />
                                    <div className="flex justify-between text-lg font-bold text-surface-900">
                                        <span>Total</span>
                                        <span>${(totalPrice + 5).toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="mt-8 space-y-3">
                                    <Link to="/checkout" className="block w-full">
                                        <Button className="w-full">
                                            Proceed to Checkout <ArrowRight size={18} className="ml-2"/>
                                        </Button>
                                    </Link>
                                    <Button variant="outline" className="w-full text-red-500 hover:bg-red-50 hover:border-red-100" onClick={clearCart}>
                                        Clear Cart
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
