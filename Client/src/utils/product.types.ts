/**
 * Скидка на основе количества
 */
export interface PriceDiscount {
  min_quantity: number;
  price: number;
}

/**
 * Информация о ценах продукта
 */
export interface ProductPricing {
  price_per_ton: number;
  price_per_meter: number;
  ton_discounts: PriceDiscount[];
  meter_discounts: PriceDiscount[];
  vat_rate: number;
}

/**
 * Информация о складе
 */
export interface Stock {
  id: string;
  city: string;
  name: string;
  address: string;
  schedule: string;
  cash_payment: boolean;
  card_payment: boolean;
}

/**
 * Информация о доступности продукта на складе
 */
export interface ProductAvailability {
  stock: Stock;
  in_stock_tons: number;
  in_stock_meters: number;
  avg_tube_length: number;
  avg_tube_weight: number;
  pricing: ProductPricing;
}

/**
 * Основная модель продукта
 */
export interface Product {
  id: string;
  category_id: string;
  type_id: string;
  type_code: string;
  production_type: string;
  name: string;
  gost: string;
  form_of_length: string;
  manufacturer: string;
  steel_grade: string;
  diameter: number;
  wall_thickness: number;
  status: number;
  conversion_factor: number;
  availability: ProductAvailability[];
}

/**
 * Ответ от API со списком продуктов
 */
export interface ProductsResponse {
  products: Product[];
  total: number;
}
