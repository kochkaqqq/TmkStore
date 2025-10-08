import '@mantine/core/styles.css';
import { MantineProvider, createTheme, useMantineTheme, useComputedColorScheme } from '@mantine/core';
import { Router } from './Router';
import { useEffect, useState } from 'react';
import { init, themeParams, isThemeParamsDark, backButton, miniApp } from "@telegram-apps/sdk";
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { useNavigate, useLocation } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';

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
            <Router />
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
            <Notifications position="top-center" />
            <ModalsProvider>
                <ProductProvider>
                    <AppContent />
                </ProductProvider>
            </ModalsProvider>
        </MantineProvider>
    );
}