import { writable, type Writable } from 'svelte/store';

export type Theme = 'dark' | 'light';
export let currentTheme: Writable<Theme> = writable('dark');
