<script lang="ts">
    import { inertia } from '@inertiajs/svelte';
    import NumberFlow from '@number-flow/svelte';
    import { onMount } from 'svelte';

    let { status }: { status: number } = $props();

    const res: (statusCode: number) => { title: string; description: string } | null = (statusCode) => {
        if (statusCode === 503) {
            return {
                title: '503: Service Unavailable',
                description: 'Sorry, we are doing some maintenance. Please check back soon.',
            };
        } else if (statusCode === 500) {
            return {
                title: '500: Server Error',
                description: 'Whoops, something went wrong on our servers.',
            };
        } else if (statusCode === 404) {
            return {
                title: '404: Page Not Found',
                description: 'Sorry, the page you are looking for could not be found.',
            };
        } else if (statusCode === 403) {
            return {
                title: '403: Forbidden',
                description: 'Sorry, you are forbidden from accessing this page.',
            };
        } else return null;
    };
    const statusRes = res(status);
</script>

<div class="card-lg flex flex-col gap-4">
    {#if statusRes === null}
        <h1 class="title">An Unknown error occured</h1>
    {:else}
        <h1 class="title">{statusRes.title}</h1>
        <div>
            <p>{statusRes.description}</p>
            <a href="/" use:inertia={{ prefetch: true, cacheFor: 3000 }} class="link">Return Home</a>
        </div>
    {/if}
</div>
