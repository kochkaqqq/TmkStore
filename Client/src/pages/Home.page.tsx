import { Header } from '../components/Header/Header';
import { Title } from '@mantine/core';
import { ProductCard } from '../components/ProductCard/ProductCard';

const products = [
  {
    description: 'Труба стальная',
    ntd: 'ГОСТ 12345',
    thickness: '50 мм',
    size: '25 мм',
    steelGrade: 'Ст3',
    factory: 'Металлургический завод',
    inStock: true,
    priceWithVat: 25000,
  },
  {
    description: 'Труба деревяная',
    ntd: 'ГОСТ 12345',
    thickness: '50 мм',
    size: '40 мм',
    steelGrade: 'Ст5',
    factory: 'Бор',
    inStock: false,
    priceWithVat: 25000000000,
  },
  {
    description: 'Труба стальная',
    ntd: 'ГОСТ 12345',
    thickness: '5 мм',
    size: '70 мм',
    steelGrade: 'Ст3',
    factory: 'Металлургический завод',
    inStock: true,
    priceWithVat: 25000,
  }
];
import { Title, Space } from '@mantine/core';
import { FilterList } from '@/components/Filter/FilterList/FilterList';
import { FilterProvider } from '../context/FilterContext';

export function HomePage() {
    return (
        <>
            <Header />
            <Title
                order={1}
                fw={400}
                tt="uppercase"
                style={{
                    fontSize: 'clamp(1.7rem, 4vw, 10rem)', // CSS clamp для плавного масштабирования
                    lineHeight: 1.2,
                }}
                px="md"
                mt="xl"
            >
                Интернет-магазин труб и металлопродукции
            </Title>
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
                {products.map((product, index) => (
                <ProductCard
                    key={index}
                    description={product.description}
                    ntd={product.ntd}
                    thickness={product.thickness}
                    size={product.size}
                    steelGrade={product.steelGrade}
                    factory={product.factory}
                    inStock={product.inStock}
                    priceWithVat={product.priceWithVat}
                    onAddToCart={() => console.log('Добавлено в корзину')}
                    onDetails={() => console.log('Детали')}
                />
                ))}
            </div>
            <Space h="xl"></Space>
            <FilterProvider>
                <FilterList></FilterList>
            </FilterProvider>
        </>
    );
}
