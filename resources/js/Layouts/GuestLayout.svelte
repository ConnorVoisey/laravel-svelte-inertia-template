<script lang="ts">
    import { inertia } from '@inertiajs/svelte';
    import ApplicationLogo from '@/Components/ApplicationLogo.svelte';
</script>

<div class="bg-gray-100 dark:bg-gray-900 flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0">
    <div>
        <a use:inertia href="/">
            <ApplicationLogo class="fill-current text-gray-500 h-20 w-20" />
        </a>
    </div>

    <div class="bg-white dark:bg-gray-800 mt-6 w-full overflow-hidden px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
        <slot />
    </div>
</div>
