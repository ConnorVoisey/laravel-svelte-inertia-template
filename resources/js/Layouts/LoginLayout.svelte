<script lang="ts">
    import Loading from '@/Components/Loading.svelte';
    import ThemeSelector from '@/Components/ThemeSelector.svelte';
    import type { Snippet } from 'svelte';
    import { router } from '@inertiajs/svelte';

    let isLoading = $state(false);
    let isLoadingTimeout = 0;
    router.on('start', (event) => {
        console.log({ on: 'start', event });
        // interita decides to call this event when prefetching and does not provide any api to determine whether the request is a prerequest or an actual click
        // if the request is a prefetch the user doesnt need the loading indicator since they have not actively called this link, add a timeout for 250ms so that hopefully most of the prefetch links will be resolved before the loading spinner runs. In reality, page loads are the same time for prefetched pages and non prefetched pages since there's no differnce in laravel,
        // therefore this loading spinnner doesn't make much sense.
        clearTimeout(isLoadingTimeout);
        isLoadingTimeout = setTimeout(() => (isLoading = true), 250);
    });

    router.on('finish', (event) => {
        console.log({ on: 'finish', event });
        clearTimeout(isLoadingTimeout);
        isLoading = false;
    });

    let { children }: { children: Snippet } = $props();
</script>

<div class="wrapper h-svh">
    <ul class="circles">
        {#each new Array(15) as _}
            <li></li>
        {/each}
    </ul>
    <div class="content grid items-center justify-center">
        <div class="absolute right-8 top-8">
            <ThemeSelector />
        </div>
        {#if isLoading}
            <Loading />
        {/if}
        <!-- Page Content -->
        <main class="z-40 rounded-2xl bg-surface-2 p-8">
            {@render children?.()}
        </main>
    </div>
</div>

<style lang="scss">
    .wrapper {
        background: linear-gradient(20deg, primary(9), primary(8));
        display: grid;
        grid-template-columns: 1fr;
        & > * {
            grid-area: 1 / 1 / 2 /2;
        }
    }
    main {
        min-width: min(100vw, 350px);
        max-width: 500px;
    }

    .circles {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        margin: auto;
        padding: 0;
        overflow: hidden;
        li {
            position: absolute;
            display: block;
            list-style: none;
            width: 20px;
            height: 20px;
            background: #ffffff33;
            animation: animate 25s linear infinite;
            bottom: -200px;
        }
        @for $i from 1 through 15 {
            $size: random(130) + 60 + px;
            li:nth-child(#{$i}) {
                left: percentage(calc(random(100) / 100));
                width: $size;
                height: $size;
                animation-delay: random(35) - 20 + s;
                animation-duration: random(20) + 5 + s;
                border-radius: random(30) + px;
            }
        }
    }
    @keyframes animate {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }

        100% {
            transform: translateY(-1000px) rotate(720deg);
            opacity: 0;
            border-radius: 60%;
        }
    }
</style>
