import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    server: {
        // Разрешаем внешний домен
        allowedHosts: ['jubilantly-equipped-nit.cloudpub.ru'],
        // Если нужен доступ извне
        host: true, // или '0.0.0.0'
        // Настройки HMR за прокси/ingress (при необходимости)
        hmr: {
            host: 'jubilantly-equipped-nit.cloudpub.ru',
            protocol: 'wss', // если у фронта HTTPS
            // port: 443 // укажи, если нужен фиксированный порт
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './vitest.setup.mjs',
    },
});
