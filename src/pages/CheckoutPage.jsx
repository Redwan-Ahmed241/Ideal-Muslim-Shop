import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';
import SectionHeader from '../components/ui/SectionHeader';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';

export default function CheckoutPage() {
    const { cartItems, totalPrice, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    
    const [formData, setFormData] = useState({
        name: user?.name || '',
        phone: '',
        address: '',
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (cartItems.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        try {
            setLoading(true);
            const orderData = {
                ...formData,
                items: cartItems.map(item => ({ product_id: item.id, quantity: item.quantity, price: item.price })),
                total_amount: totalPrice + 5, // including $5 shipping
                payment_method: 'cash_on_delivery'
            };

            // TODO: backend route
            // await api.post('/orders', orderData);
            
            // Temporary simulation for now until backend is ready
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            setSuccess(true);
            clearCart();
        } catch (error) {
            console.error('Checkout failed', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <main className="min-h-screen pt-32 pb-16 bg-surface-50">
                <div className="max-w-xl p-12 mx-auto text-center bg-white border shadow-sm rounded-3xl border-surface-100">
                    <div className="grid w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full place-items-center">
                        <span className="text-3xl text-green-600">✓</span>
                    </div>
                    <h2 className="mb-4 text-3xl font-bold font-[family-name:var(--font-heading)] text-surface-900">Order Placed!</h2>
                    <p className="mb-8 text-surface-500">Alhamdulillah! Your order has been placed successfully via Cash on Delivery. We will contact you shortly.</p>
                    <Button onClick={() => navigate('/shop')}>Continue Shopping</Button>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen pt-24 pb-16 bg-surface-50">
            <div className="px-6 mx-auto max-w-3xl lg:px-8">
                <SectionHeader title="Checkout" subtitle="Cash on Delivery" className="text-center" />

                <div className="p-8 mt-8 bg-white border shadow-sm rounded-3xl border-surface-100">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-surface-700">Full Name</label>
                            <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 border rounded-xl border-surface-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20" />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-surface-700">Phone Number</label>
                            <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 border rounded-xl border-surface-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20" />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-surface-700">Delivery Address</label>
                            <textarea required name="address" value={formData.address} onChange={handleChange} rows={3} className="w-full px-4 py-3 border rounded-xl border-surface-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20" />
                        </div>
                        
                        <div className="p-4 mt-6 rounded-xl bg-primary-50 text-primary-800">
                            <strong>Payment Method:</strong> Cash on Delivery (Pay when you receive the package).
                        </div>

                        <Button type="submit" className="w-full" disabled={loading || cartItems.length === 0}>
                            {loading ? 'Processing...' : `Place Order ($${(totalPrice + 5).toFixed(2)})`}
                        </Button>
                    </form>
                </div>
            </div>
        </main>
    );
}
