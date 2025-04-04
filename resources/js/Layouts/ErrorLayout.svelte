<script lang="ts">
    import type { Snippet } from 'svelte';
    import ThemeSelector from '@/Components/ThemeSelector.svelte';
    let { children }: { children: Snippet } = $props();
</script>

<div class="wrapper">
    <main class="content-width">
        {@render children()}
    </main>
</div>

<style lang="scss">
    .wrapper {
        height: 100svh;
        display: grid;
        align-items: center;
        justify-content: center;
    }
</style>
