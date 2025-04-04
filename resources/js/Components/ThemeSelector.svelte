<script lang="ts">
    import axios from 'axios';
    import { onMount } from 'svelte';
    import { currentTheme } from '../theme.svelte';

    let root: Element | null = null;
    onMount(async () => {
        root = document.querySelector(':root');
        if (!root) return;
        const theme = root.getAttribute('theme') ?? 'light';
        currentTheme.set(theme === 'dark' ? 'dark' : 'light');
    });

    const updateTheme = async (theme: 'dark' | 'light') => {
        axios.post('/setTheme', {
            theme,
        });
        currentTheme.set(theme);
        if (theme) document.documentElement.setAttribute('theme', theme);
    };
</script>

<form method="post" on:submit|preventDefault={() => updateTheme($currentTheme === 'dark' ? 'light' : 'dark')}>
    <button class="theme-selector-wrapper">
        <input type="checkbox" name="isLight" id="isLight" checked={$currentTheme === 'dark'} />
        <span>
            {#if $currentTheme === 'dark'}
                <svg fill="none" stroke="var(--svg-color)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                </svg>
            {:else}
                <svg fill="none" stroke="var(--svg-color)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                </svg>
            {/if}
        </span>
    </button>
</form>

<style lang="scss">
    .theme-selector-wrapper {
        --circle-diameter: 1.5rem;
        --svg-color: #{on-surface(1)};
        display: grid;
        align-items: center;
        justify-content: center;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        padding: size(1);
        width: calc((var(--circle-diameter) * 2) + 2 * (size(1) + size(1)));
        background-color: surface(0);
        box-sizing: border-box;
        border-radius: 100vh;
        cursor: pointer;
        transition: border 200ms;

        input[type='checkbox'] {
            grid-area: 1 / 1 / 2 / 2;
            opacity: 0;
            height: 0;
            width: 0;
            &:checked + span {
                --svg-color: #{primary(6)};
                transform: translateX(calc(1 * var(--circle-diameter))) rotate(360deg);
            }
        }
        span {
            grid-area: 1 / 1 / 2 / 2;
            transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            transform: translateX(0);
            border-radius: 50%;
            &,
            svg {
                width: var(--circle-diameter);
                height: var(--circle-diameter);
            }
        }
    }
</style>
