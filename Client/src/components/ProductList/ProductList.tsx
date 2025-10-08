import { ProductCard } from '../ProductCard/ProductCard';
import { Title } from '@mantine/core';
import { useFilters } from '../../context/FilterContext';
import { useProducts } from '../../context/ProductContext';
import { Product } from '../../utils/product.types';
import { useMemo } from 'react';

export function ProductList() {
    const { filters } = useFilters();
    const { products } = useProducts();

    // Фильтрация продуктов на основе выбранных фильтров
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            // Фильтр по типу продукции
            if (filters.type_ids.length > 0) {
                const matchesType = filters.type_ids.some(typeId => product.type_id === typeId);
                if (!matchesType) return false;
            }

            // Фильтр по складу
            if (filters.stock_ids.length > 0) {
                const hasStock = product.availability.some(avail =>
                    filters.stock_ids.includes(avail.stock.id)
                );
                if (!hasStock) return false;
            }

            // Фильтр по марке стали
            if (filters.steel_grades.length > 0) {
                const matchesGrade = filters.steel_grades.includes(product.steel_grade);
                if (!matchesGrade) return false;
            }

            // Фильтр по ГОСТу
            if (filters.gosts.length > 0) {
                const matchesGost = filters.gosts.includes(product.gost);
                if (!matchesGost) return false;
            }

            // Фильтр по производителю
            if (filters.manufacturers.length > 0) {
                const matchesManufacturer = filters.manufacturers.includes(product.manufacturer);
                if (!matchesManufacturer) return false;
            }

            // Фильтр по диаметру
            if (filters.diameter_min > 0 && product.diameter < filters.diameter_min) {
                return false;
            }
            if (filters.diameter_max > 0 && product.diameter > filters.diameter_max) {
                return false;
            }

            // Фильтр по толщине стенки
            if (filters.wall_thickness_min > 0 && product.wall_thickness < filters.wall_thickness_min) {
                return false;
            }
            if (filters.wall_thickness_max > 0 && product.wall_thickness > filters.wall_thickness_max) {
                return false;
            }

            return true;
        });
    }, [products, filters]);

    return (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 16,
                marginTop: '1.5rem',
                paddingLeft: '1rem',
                paddingRight: '1rem',
            }}
        >
            {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => {
                    const firstAvailability = product.availability[0];

                    const stockQuantity = filters.unit === 'tons'
                        ? firstAvailability?.in_stock_tons || 0
                        : firstAvailability?.in_stock_meters || 0;

                    const priceWithVat = filters.unit === 'tons'
                        ? firstAvailability?.pricing.price_per_ton || 0
                        : firstAvailability?.pricing.price_per_meter || 0;

                    const inStock = product.availability.some(
                        avail => avail.in_stock_tons > 0 || avail.in_stock_meters > 0
                    );

                    return (
                        <ProductCard
                            key={product.id}
                            product={product}
                            unit={filters.unit}
                            displayedPrice={priceWithVat}
                            displayedQuantity={stockQuantity}
                            inStock={inStock}
                        />
                    );
                })
            ) : (
                <Title order={3} c="dimmed" style={{ width: '100%', textAlign: 'center', marginTop: '2rem' }}>
                    Товары не найдены. Попробуйте изменить фильтры.
                </Title>
            )}
        </div>
    );
}