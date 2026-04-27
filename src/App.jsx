/**
 * Root App component — sets up routing and global layout.
 *
 * Architecture:
 * - BrowserRouter wraps the entire app
 * - AuthProvider supplies auth state to all components
 * - Navbar + Footer wrap around route content
 * - Login page hides Navbar/Footer for a clean full-screen experience
 */
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';

import LoginPage from './pages/LoginPage';
import CommunityPage from './pages/CommunityPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

function Layout() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <>
      {!isLoginPage && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />

        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/community" element={<CommunityPage />} />
      </Routes>
      {!isLoginPage && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <CartProvider>
            <Layout />
          </CartProvider>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
