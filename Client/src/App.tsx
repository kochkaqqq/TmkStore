import '@mantine/core/styles.css';
import { MantineProvider, createTheme, useMantineTheme, useComputedColorScheme } from '@mantine/core';
import { Router } from './Router';
import { useEffect, useState } from 'react';
import { init, themeParams, isThemeParamsDark, backButton, miniApp } from "@telegram-apps/sdk";
import { useNavigate, useLocation } from 'react-router-dom';

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
        // Получить background color в зависимости от темы
        const bgColor = colorScheme === 'dark' ? mantineTheme.colors.dark?.[7] : mantineTheme.white;
        console.log(colorScheme)
        // Установить header color
        if (miniApp.setHeaderColor.isAvailable()) {
            console.log(bgColor)
            miniApp.setHeaderColor(bgColor);
        }

        // Установить bottom bar color (если доступно)
        if (miniApp.setBottomBarColor.isAvailable()) {
            miniApp.setBottomBarColor(bgColor);
        }

        // Установить background color приложения
        if (miniApp.setBackgroundColor.isAvailable()) {
            miniApp.setBackgroundColor(bgColor);
        }
    }, [mantineTheme, colorScheme]);

    return null;
}

export default function App() {
    const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');
    const navigate = useNavigate();
    const location = useLocation();

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
        <MantineProvider theme={theme} forceColorScheme={colorScheme}>
            <TelegramColors />
            <Router />
        </MantineProvider>
    );
}
