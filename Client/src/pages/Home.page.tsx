import { Header } from '../components/Header/Header';
import { ProductList } from '../components/ProductList/ProductList';
import { Title, Space } from '@mantine/core';
import { FilterList } from '@/components/Filter/FilterList/FilterList';
import { FilterProvider } from '../context/FilterContext';

export function HomePage() {
    return (
        <>
            <Header showCart />
            <Title
                order={1}
                fw={400}
                tt="uppercase"
                style={{
                    fontSize: 'clamp(1.7rem, 4vw, 10rem)',
                    lineHeight: 1.2,
                }}
                px="md"
                mt="xl"
            >
                Интернет-магазин труб и металлопродукции
            </Title>
            <Space h="xl" />
            <FilterProvider>
                <FilterList />
                <Space h="xs" />
                <ProductList />
            </FilterProvider>
        </>
    );
}
