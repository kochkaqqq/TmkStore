// context/ProductContext.tsx
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product } from '../utils/product.types';
// Прямой импорт JSON файла
import productsData from '../data.json';

interface ProductContextType {
    products: Product[];
    loading: boolean;
    error: string | null;
    setProducts: (products: Product[]) => void;
}

const ProductContext = createContext<ProductContextType | null>(null);

interface ProductProviderProps {
    children: ReactNode;
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadProducts() {
            try {
                setLoading(true);
                await new Promise(resolve => setTimeout(resolve, 300));
                setProducts(productsData as Product[]);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
                console.error('Error loading products:', err);
            } finally {
                setLoading(false);
            }
        }

        loadProducts();
    }, []);

    return (
        <ProductContext.Provider value={{ products, loading, error, setProducts }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within ProductProvider');
    }
    return context;
};
