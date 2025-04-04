<script lang="ts">
    import type { Snippet } from 'svelte';
    import { Link } from '@inertiajs/svelte';

    let {
        children,
        href,
        ...attrs
    }: {
        children: Snippet;
        href: string;
    } = $props();
</script>

<Link
    {...attrs}
    {href}
    class="text-gray-700 hover:bg-gray-100 focus:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 dark:focus:bg-gray-800 block w-full px-4 py-2 text-start text-sm leading-5 transition duration-150 ease-in-out focus:outline-none"
>
    {@render children()}
</Link>
