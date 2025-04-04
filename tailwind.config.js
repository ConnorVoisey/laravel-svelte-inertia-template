import forms from '@tailwindcss/forms';
import defaultTheme from 'tailwindcss/defaultTheme';

const colorsText = ['surface', 'primary', 'secondary', 'info', 'success', 'warning', 'error'];
const colors = Object.fromEntries(
    colorsText.map((clr) => [
        clr,
        Object.fromEntries(Array.from({ length: 10 }).map((_, i) => [i, `hsl(var(--clr-${clr}-${i}))`])),
    ]),
);

const onColors = Object.fromEntries(
    colorsText
        .map((clr) => `on-${clr}`)
        .map((clr) => [
            clr,
            Object.fromEntries(Array.from({ length: 4 }).map((_, i) => [i, `hsl(var(--clr-${clr}-${i}))`])),
        ]),
);
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.svelte',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
        colors: { ...colors, ...onColors },
    },

    plugins: [forms],
};
