import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
plugins: [
    react(),
    VitePWA({
    registerType: 'autoUpdate',
    devOptions: {
        enabled: true,
    },
    includeAssets: ['favicon.ico', 'icon.png', 'vite.svg'],
    manifest: {
        name: 'Depan-Heure',
        short_name: 'dep',
        description: 'Le meilleur dépanneur en ligne',
        theme_color: '#ffffff',
        icons: [
        {
            src: 'icon.png',
            sizes: '268x268',
            type: 'image/png',
        },
        {
            src: 'logo512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
        },
        ],
    },
    }),
],
});
