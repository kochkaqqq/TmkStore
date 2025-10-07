import '@mantine/core/styles.css';
import { MantineProvider, createTheme, useMantineTheme, useComputedColorScheme, Loader, Center, Text } from '@mantine/core';
import { Router } from './Router';
import { useEffect, useState } from 'react';
import { init, themeParams, isThemeParamsDark, backButton, miniApp } from "@telegram-apps/sdk";
import { useNavigate, useLocation } from 'react-router-dom';
import { ProductProvider, useProducts } from './context/ProductContext';

const CONTRAST = '#ff5106';
const ON_CONTRAST = '#ffffff';

const theme = createTheme({
    fontFamily: '"PT Sans Narrow", -apple-system, BlinkMacSystemFont, sans-serif',
    headings: {
        fontFamily: '"PT Sans Narrow", -apple-system, BlinkMacSystemFont, sans-serif',
    },
    other: {
        contrast: CONTRAST,
        onContrast: ON_CONTRAST
    },
});

// Компонент для установки цветов header/bottom bar
function TelegramColors() {
    const mantineTheme = useMantineTheme();
    const colorScheme = useComputedColorScheme();

    useEffect(() => {
        const bgColor = colorScheme === 'dark' ? mantineTheme.colors.dark?.[7] : mantineTheme.white;

        if (miniApp.setHeaderColor.isAvailable()) {
            miniApp.setHeaderColor(bgColor as any);
        }

        if (miniApp.setBottomBarColor.isAvailable()) {
            miniApp.setBottomBarColor(bgColor as any);
        }

        if (miniApp.setBackgroundColor.isAvailable()) {
            miniApp.setBackgroundColor(bgColor as any);
        }
    }, [mantineTheme, colorScheme]);

    return null;
}

function AppLoader({ children }: { children: React.ReactNode }) {
    const { loading, error } = useProducts();

    if (loading) {
        return (
            <Center style={{ minHeight: '100vh' }}>
                <div style={{ textAlign: 'center' }}>
                    <Loader size="xl" type="dots" />
                    <Text mt="md" c="dimmed">Загрузка данных...</Text>
                </div>
            </Center>
        );
    }

    if (error) {
        return (
            <Center style={{ minHeight: '100vh' }}>
                <div style={{ textAlign: 'center' }}>
                    <Text c="red" size="lg" fw={600}>Ошибка загрузки</Text>
                    <Text mt="sm" c="dimmed">{error}</Text>
                </div>
            </Center>
        );
    }

    return <>{children}</>;
}

function AppContent() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (backButton.mount.isAvailable()) {
            backButton.mount();
        }

        const handleClick = () => navigate(-1);

        if (location.pathname !== '/' && backButton.show.isAvailable()) {
            backButton.show();
            backButton.onClick(handleClick);
        } else if (location.pathname === '/' && backButton.hide.isAvailable()) {
            backButton.hide();
        }

        return () => {
            backButton.offClick(handleClick);
        };
    }, [location.pathname, navigate]);

    return (
        <>
            <TelegramColors />
            <AppLoader>
                <Router />
            </AppLoader>
        </>
    );
}

export default function App() {
    const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        init();

        if (miniApp.mount.isAvailable()) {
            miniApp.mount();
        }

        if (themeParams.mount.isAvailable()) {
            themeParams.mount();
        }

        const isDark = isThemeParamsDark();
        setColorScheme(isDark ? 'dark' : 'light');
    }, []);

    return (
        <MantineProvider theme={theme} forceColorScheme={colorScheme}>
            <ProductProvider>
                <AppContent />
            </ProductProvider>
        </MantineProvider>
    );
}
