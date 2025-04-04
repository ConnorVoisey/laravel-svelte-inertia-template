import { svelte } from '@sveltejs/vite-plugin-svelte';
import laravel from 'laravel-vite-plugin';
import path from 'path';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';
import { run } from 'vite-plugin-run';
import { watch } from 'vite-plugin-watch';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.ts',
            ssr: 'resources/js/ssr.ts',
            refresh: true,
        }),
        run([
            {
                name: 'trail generate routes',
                pattern: 'routes/*.php',
                run: ['php', 'artisan', 'trail:generate'],
            },
            {
                name: 'clear compiled views',
                pattern: 'routes/*.php',
                run: ['php', 'artisan', 'view:clear'],
            },
        ]),
        svelte(),
        Icons({
            compiler: 'svelte',
        }),
        watch({
            pattern: '*.php',
            command: ['php artisan trail:generate', 'npm run db:gen_types'],
        }),
    ],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
             @use '${path.resolve('resources/css/_variables.scss')}' as *;
        `,
            },
        },
    },
});
