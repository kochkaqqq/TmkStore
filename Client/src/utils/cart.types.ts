export interface CartItem {
    id: string; // уникальный ID элемента корзины
    productId: string;
    productName: string;
    stockId: string;
    stockName: string;
    stockAddress: string;
    quantity: number;
    unit: 'tons' | 'meters';
    pricePerUnit: number;
    totalPrice: number;
    discount: number;
    product: {
        gost: string;
        steel_grade: string;
        diameter: number;
        wall_thickness: number;
        manufacturer: string;
    };
}