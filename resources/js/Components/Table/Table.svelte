<script lang="ts" generics="T extends string, V extends Record<string, any>">
    import IconArrowLeft from '~icons/mdi/arrow-left';
    import IconArrowRight from '~icons/mdi/arrow-right';
    import { inertia } from '@inertiajs/svelte';
    import LoadingSmall from '@/Components/LoadingSmall.svelte';
    import { type Column, type Fetcher, refreshEveryOptions } from './index';
    import { onMount } from 'svelte';
    import Select from '../Select.svelte';
    import NumberFlow from '@number-flow/svelte';
    import { fade } from 'svelte/transition';

    type Props = {
        paginator?: { limit: number; offset: number };
        columns: Column<T, V>[];
        fetchRes?: {
            rows: V[];
            count: number;
        } | null;
        fetcher?: Fetcher<T, V>;
        isLoading?: boolean;
        errorMsg?: string;
        refreshEvery?: (typeof refreshEveryOptions)[number] | null;
        displayPaginator?: boolean;
    };
    let {
        columns,
        fetchRes = null,
        isLoading = $bindable(),
        paginator = $bindable({ limit: 15, offset: 0 }),
        errorMsg,
        fetcher,
        refreshEvery = null,
        displayPaginator = true,
    }: Props = $props();
    let shownColumns = $derived(columns.filter((c) => !c.hidden));

    let fetchTimeout = 0;
    let secTillFetch = $state(5);
    const debounceMs = 50;
    const getData = () => {
        if (fetcher) {
            isLoading = true;
            clearTimeout(fetchTimeout);
            fetchTimeout = setTimeout(async () => {
                try {
                    const res = await fetcher({ paginator, columns });
                    if (res.error) {
                        console.error(res.error.message);
                        return;
                    }
                    fetchRes = res.data;
                } finally {
                    isLoading = false;
                }
            }, debounceMs);
        }
    };
    let refreshInterval = 0;
    let countDownInterval = 0;
    onMount(() => {
        const refreshEveryVal = refreshEvery?.value;
        if (refreshEveryVal != null) {
            refreshInterval = setInterval(() => {
                getData();
                secTillFetch = refreshEveryVal / 1000;
            }, refreshEveryVal);
            secTillFetch = refreshEveryVal / 1000;
        }
        saveOptions();
        setInterval(() => secTillFetch--, 1000);
        return () => {
            clearInterval(refreshInterval);
            clearInterval(countDownInterval);
        };
    });

    $effect(() => {
        getData();
    });

    const saveOptions = () => {};
</script>

<div class="flex flex-col gap-2">
    {#if refreshEvery != null}
        <div class="flex flex-wrap items-end gap-4">
            <Select
                label="Refresh Every"
                options={refreshEveryOptions.map((opt) => ({ value: opt.label, label: opt.label }))}
                bind:value={
                    () => refreshEvery?.label ?? null,
                    (v) => {
                        refreshEvery = refreshEveryOptions.find((r) => r.label === v) ?? refreshEveryOptions[0];
                        clearInterval(refreshInterval);
                        const refreshEveryVal = refreshEvery.value;
                        if (refreshEveryVal == null) {
                            saveOptions();
                            return;
                        }

                        refreshInterval = setInterval(() => {
                            getData();
                            secTillFetch = refreshEveryVal / 1000;
                        }, refreshEveryVal);
                        secTillFetch = refreshEveryVal / 1000;
                        saveOptions();
                    }
                }
            ></Select>
            {#if refreshEvery.value !== null}
                <div class="flex items-center gap-1">
                    <p>Next Refresh</p>
                    <span class="flex"><NumberFlow value={secTillFetch}></NumberFlow>s</span>
                </div>
                {#if isLoading}
                    <div transition:fade>
                        <LoadingSmall></LoadingSmall>
                    </div>
                {/if}
            {/if}
        </div>
    {/if}
    <div class="flex flex-col">
        <table class="w-full rounded-xl">
            <thead>
                <tr>
                    {#each shownColumns as col, i}
                        <th
                            class="subtitle bg-surface-2 p-2 text-start"
                            class:rounded-tl-xl={i === 0}
                            class:rounded-tr-xl={i === shownColumns.length - 1}>{col.label}</th
                        >
                    {/each}
                </tr>
            </thead>
            <tbody>
                {#if isLoading && fetchRes == null}
                    <tr>
                        <td colspan="999">
                            <div class="grid w-full items-center justify-center bg-surface-1 p-2">
                                <LoadingSmall size="medium"></LoadingSmall>
                            </div>
                        </td>
                    </tr>
                {:else if fetchRes == null}
                    <tr>
                        <td colspan="999">
                            <div class="grid w-full items-center justify-center bg-surface-1 p-2">
                                <p>Something went wrong</p>
                            </div>
                        </td>
                    </tr>
                {:else if errorMsg != null}
                    <tr>
                        <td colspan="999">
                            <div class="grid w-full items-center justify-center bg-surface-1 p-2">
                                <h4 class="subtitle">An error occured:</h4>
                                <p>{errorMsg}</p>
                            </div>
                        </td>
                    </tr>
                {:else}
                    {#each fetchRes.rows as row, rowI}
                        <tr>
                            {#each shownColumns as col, colI}
                                {@const cell = col.cellRenderer(row)}
                                {@const isLastRow = rowI === fetchRes.rows.length - 1}
                                {#if cell.type === 'link'}
                                    <td
                                        class="relative h-full border-t-[1px] border-on-surface-2 p-2"
                                        class:highlight-error={cell.highlightError}
                                        class:highlight-row-on-hover={cell.highlightRowOnHover}
                                        class:link={!cell.highlightRowOnHover}
                                        class:bg-surface-2={rowI % 2}
                                        class:bg-surface-1={rowI - (1 % 2)}
                                        class:border-b-[1px]={isLastRow}
                                    >
                                        {#if 'text' in cell}
                                            {cell.text}
                                        {:else}
                                            {@render cell.snippet(row)}
                                        {/if}
                                        <a
                                            aria-label={'text' in cell ? cell.text : 'open-row'}
                                            class="absolute left-0 top-0 grid h-full w-full"
                                            href={cell.href}
                                            use:inertia={{ prefetch: true, cacheFor: 3000 }}
                                        ></a>
                                    </td>
                                {:else if cell.type === 'custom'}
                                    <td
                                        class="relative h-full border-t-[1px] border-on-surface-2 p-2"
                                        class:bg-surface-2={rowI % 2}
                                        class:bg-surface-1={rowI - (1 % 2)}
                                        class:border-b-[1px]={isLastRow}>{@render cell.renderer(col, row)}</td
                                    >
                                {/if}
                            {/each}
                        </tr>
                    {/each}
                {/if}
            </tbody>
        </table>
        {#if displayPaginator}
            <div class="flex w-full items-center justify-center gap-2 rounded-bl-xl rounded-br-xl bg-surface-1 p-2">
                <button class="btn-primary" onclick={() => (paginator.offset -= paginator.limit)}
                    ><IconArrowLeft></IconArrowLeft></button
                >
                <p>
                    {paginator.offset} - {Math.min(
                        paginator.offset + paginator.limit,
                        fetchRes?.count ?? 0,
                    )}{fetchRes !== null ? ` of ${fetchRes.count}` : ''}
                </p>
                <button class="btn-primary" onclick={() => (paginator.offset += paginator.limit)}
                    ><IconArrowRight></IconArrowRight></button
                >
            </div>
        {/if}
    </div>
</div>

<style lang="scss">
    .highlight-error {
        background-color: error(5);
        color: on-error(0);
    }
    tr:has(.highlight-row-on-hover:hover) a,
    a:hover {
        background: #00000030;
    }
    table .link {
        display: table-cell;
    }
</style>
