import { HomePage } from './pages/Home.page';
import { ShowInitData } from './pages/ShowInitData.page';
import { Routes, Route } from 'react-router-dom';
import { FilterProvider } from './context/FilterContext';

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/init-data" element={<ShowInitData />} />
        </Routes>
    );
}

