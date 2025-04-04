<script lang="ts">
    import { Shadow } from 'svelte-loading-spinners';
    // loading spinners are imported in this package, you can replace it with a different on if you want
    // Demo: https://schum123.github.io/svelte-loading-spinners/
    // Repo: https://github.com/Schum123/svelte-loading-spinners

    type Props = {
        variant?: 'onSurface' | 'onPrimary';
        size?: 'small' | 'medium';
    };
    const { variant = 'onSurface', size = 'small' }: Props = $props();

    const color = $derived.by(() => {
        if (variant == 'onSurface') return 'hsl(var(--clr-on-surface-1))';
        return 'hsl(var(--clr-on-primary-1))';
    });
</script>

<div class:p-8={size === 'medium'} class:p-2={size === 'small'}>
    <Shadow size={size === 'small' ? 16 : 48} {color} unit="px" duration="1s" />
</div>
