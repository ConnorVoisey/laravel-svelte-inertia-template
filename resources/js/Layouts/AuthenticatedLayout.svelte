<script lang="ts">
    import { onMount, type Snippet } from 'svelte';
    import Sidebar from '@/Components/Sidebar.svelte';
    import ErrorLayout from './ErrorLayout.svelte';
    import NumberFlow from '@number-flow/svelte';
    let { children, displaySidebar = true }: { children: Snippet; displaySidebar?: boolean } = $props();
    let isSidebarOpen = $state(true);

    let refreshCountDownInterval = -1;
    let refreshCountDownSec = $state(15);
    const countDownRefresh = () => {
        refreshCountDownInterval = setInterval(() => {
            refreshCountDownSec--;
            if (refreshCountDownSec < 0) {
                // do full page reload, not inertia since theres a good chance inertia may be in a broken state
                window.location.href = '/';
            }
        }, 1000);
    };
    onMount(() => {
        return () => clearInterval(refreshCountDownInterval);
    });
</script>

<svelte:boundary
    onerror={() => {
        countDownRefresh();
    }}
>
    <div class="wrapper" class:no-sidebar={!displaySidebar}>
        {#if displaySidebar}
            <div class="side-bar">
                <Sidebar isOpen={isSidebarOpen} {alert} />
            </div>
        {/if}

        <!-- Page Content -->
        <main class="h-full overflow-auto">
            {@render children()}
        </main>
    </div>
    {#snippet failed(error, reset)}
        <ErrorLayout>
            <div class="card-lg flex flex-col gap-4">
                <h1 class="title">Something went wrong</h1>
                <div>
                    <p>Something went wrong in rendering, please let us know what caused this.</p>
                    <p>{error}</p>
                </div>
                <div>
                    <div class="flex gap-2">
                        <p>Automatically taking you home in</p>
                        <NumberFlow value={refreshCountDownSec}></NumberFlow>
                    </div>
                    <!-- Dont use inertia here, continuing the inertia page will likely just rerender with the same error,
                    Do a full refresh so that the page is completly reset -->

                    <a href="/" class="link">Return Home</a>
                </div>
            </div>
        </ErrorLayout>
    {/snippet}
</svelte:boundary>

<style lang="scss">
    .wrapper {
        height: 100svh;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: max-content 1fr;
    }
    .wrapper.no-sidebar {
        grid-template-columns: 1fr;
        .side-bar {
            pointer-events: none;
            z-index: -1;
            position: absolute;
            left: 0;
            z-index: 50;
            top: 0;
            height: 100%;
            opacity: 0;
        }
    }
    @media (min-width: 780px) {
        .side-bar {
            margin-bottom: 0;
        }
        .wrapper {
            grid-template-columns: max-content 1fr;
            grid-template-rows: 1fr;
            grid-template-areas: 'side-bar content';
        }
    }
</style>
