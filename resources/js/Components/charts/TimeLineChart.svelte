<script lang="ts">
    import { Chart, type ScriptableScaleContext } from 'chart.js/auto';
    import 'hammerjs';
    import zoomPlugin from 'chartjs-plugin-zoom';
    import { DateTime } from 'luxon';
    import 'chartjs-scale-timestack';
    import { onMount } from 'svelte';
    import { currentTheme } from '../../theme.svelte';
    import { fade } from 'svelte/transition';
    import LoadingSmall from '../LoadingSmall.svelte';
    import Select from '@/Components/Select.svelte';

    type Props = {
        label?: string;
        isLoading?: boolean;

        minY?: number | null;
        maxY?: number | null;
        suggestedMinY?: number | null;
        suggestedMaxY?: number | null;

        // fn called to fetch the data, should mutate the chart obj with the newly fetched data
        fetcher: (input: {
            chart: Chart<'line'>;
            diskDatasetIds: Record<number, { datasetI: number; lastDatetime: Date }>;
        }) => Promise<void>;
    };
    let {
        isLoading = true,
        minY = null,
        maxY = null,
        suggestedMinY = null,
        suggestedMaxY = null,
        fetcher,
        label,
    }: Props = $props();
    let fetchInterval = 0;
    // usefull in local dev
    // const viewRangeOptions = ['5 mins', '15 mins', '1 hour', '1 day', '1 week', 'custom'] as const;
    const viewRangeOptions = ['1 hour', '1 day', '1 week', '2 week', '4 week', 'custom'] as const;
    const viewRange = $state({
        options: viewRangeOptions,
        val: '1 week' as (typeof viewRangeOptions)[number],
    });
    const fetchEveryMs = 15_000;

    let endDate = $state(DateTime.local());
    let startDate = $state(endDate.minus({ month: 2 }));
    let secTillRefresh = $state(fetchEveryMs / 1000);
    let viewInterval = 0;
    const setView = () => {
        if (viewRange.val === 'custom') return;
        if (viewRange.val === '1 hour') {
            endDate = DateTime.local();
            startDate = endDate.minus({ hour: 1 });
        } else if (viewRange.val === '1 day') {
            endDate = DateTime.local();
            startDate = endDate.minus({ days: 1 });
        } else if (viewRange.val === '1 week') {
            endDate = DateTime.local();
            startDate = endDate.minus({ weeks: 1 });
        } else if (viewRange.val === '2 week') {
            endDate = DateTime.local();
            startDate = endDate.minus({ weeks: 2 });
        } else if (viewRange.val === '4 week') {
            endDate = DateTime.local();
            startDate = endDate.minus({ weeks: 4 });
        }
    };
    Chart.register([zoomPlugin]);

    let ctx: null | HTMLCanvasElement = $state(null);
    let chart: null | Chart<'line'> = null;

    const data = {
        datasets: [],
    };
    const color = (ctx: ScriptableScaleContext) =>
        $currentTheme == 'dark' ? (ctx?.tick?.major ? '#ddd' : '#fff') : ctx?.tick?.major ? '#222' : '#111';

    const gridColor = () => ($currentTheme == 'dark' ? '#666' : '#ccc');
    const options: Chart<'line'>['options'] = $derived({
        maintainAspectRatio: false,
        animation: {
            duration: 200,
        },
        color,
        scales: {
            x: {
                type: 'timestack',
                ticks: {
                    color,
                },
                grid: {
                    color: gridColor,
                },
                min: startDate.toMillis(),
                max: endDate.toMillis(),
                timestack: {
                    format_style: {
                        month: 'short',
                    },
                    datetime: {
                        locale: null,
                    },
                },
                color: '#fff',
            },
            y: {
                type: 'linear',
                ticks: {
                    color,
                },
                grid: {
                    color: gridColor,
                },
                min: minY,
                max: maxY,
                suggestedMin: suggestedMinY,
                suggestedMax: suggestedMaxY,
            },
        },
        plugins: {
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'x',
                    modifierKey: 'ctrl',
                },
                zoom: {
                    onZoom: () => {
                        viewRange.val = 'custom';
                        saveOptions();
                        // TODO: might need to implement something that fetches records if the zoom expands currently fetched, also should apply for dragging
                    },
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true,
                    },
                    drag: {
                        enabled: true,
                    },
                    mode: 'x',
                },
            },
        },
    });
    onMount(() => {
        if (ctx === null) {
            throw new Error('Ctx was null');
        }
        chart = new Chart(ctx, {
            type: 'line',
            data,
            options,
        });
        fetchInterval = setInterval(() => {
            getData();
            secTillRefresh = fetchEveryMs / 1000 + 1;
            setView();
        }, fetchEveryMs);
        getData();
        setView();
        viewInterval = setInterval(setView, 2000);
        const decRefreshInterval = setInterval(() => {
            secTillRefresh--;
        }, 1000);

        return () => {
            clearInterval(fetchInterval);
            clearInterval(viewInterval);
            clearInterval(decRefreshInterval);
        };
    });

    const diskDatasetIds: Record<number, { datasetI: number; lastDatetime: Date }> = {};
    const getData = async () => {
        isLoading = true;
        if (chart === null) {
            console.error('called getData whilst chart was null');
            return;
        }
        try {
            await fetcher({
                chart,
                startDate,
                endDate,
                diskDatasetIds,
            });
            if (chart == null) return;
            chart.options = options;
            chart.data = data;
            chart.update();
            console.log('got data', data);
        } finally {
            isLoading = false;
        }
    };

    currentTheme.subscribe(() => chart?.update());
    const saveOptions = () => {
        if (chart == null) return;
        chart.options = options;
        chart.update();
    };
</script>

<div class="flex h-full w-full flex-col gap-4">
    <div class="flex flex-wrap items-center justify-between gap-4">
        {#if label}
            <h3 class="subtitle">{label}</h3>
        {/if}
        <div class=" flex items-center gap-4">
            {#if isLoading}
                <div transition:fade>
                    <LoadingSmall></LoadingSmall>
                </div>
            {/if}
            {#key viewRange.val}
                <Select
                    labelAtTop={false}
                    label="View Range"
                    options={viewRange.options.map((opt) => ({ value: opt, label: opt }))}
                    bind:value={
                        () => viewRange.val,
                        (v) => {
                            viewRange.val = v;
                            setView();
                            saveOptions();
                        }
                    }
                ></Select>
            {/key}
        </div>
    </div>
    <div class="relative h-full">
        <canvas bind:this={ctx}></canvas>
    </div>
</div>
