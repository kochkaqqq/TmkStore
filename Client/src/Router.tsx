import { HomePage } from './pages/Home.page';
import { Routes, Route } from 'react-router-dom';
import { CartPage } from './pages/Cart.page';

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
        </Routes>
    );
}

