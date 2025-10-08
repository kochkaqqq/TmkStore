import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product } from '../utils/product.types';
import productsData from '../data.json';

interface ProductContextType {
    products: Product[];
    setProducts: (products: Product[]) => void;
}

const ProductContext = createContext<ProductContextType | null>(null);

interface ProductProviderProps {
    children: ReactNode;
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
    const [products, setProducts] = useState<Product[]>(productsData as Product[]);

    return (
        <ProductContext.Provider value={{ products, setProducts }}>
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