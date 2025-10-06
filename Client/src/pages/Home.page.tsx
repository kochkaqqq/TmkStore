import { Header } from '../components/Header/Header';
import { Title } from '@mantine/core';

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
        </>
    );
}
