<script lang="ts">
    import TimeLineChart from '@/Components/charts/TimeLineChart.svelte';
    import axios from 'axios';
    import { route } from 'momentum-trail';
    import type { Chart } from 'chart.js';
    import type Servers from '@/schemas/public/Servers';
    import type Projects from '@/schemas/public/Projects';
    import type CpuStats from '@/schemas/public/CpuStats';

    type Props = {
        serverId: number | null;
        projectId: number | null;
    };

    type Res = {
        rows: (Servers & {
            cpu_stats: CpuStats[];
            project: Projects;
        })[];
    };

    let { serverId = null, projectId = null }: Props = $props();

    const mapDataToChart = (server: Res['rows'][number]) => ({
        data: server.cpu_stats.map((cpuStat) => ({
            x: new Date(cpuStat.updated_at ?? 0).getTime(),
            y: cpuStat.relative_load,
        })),
        borderWidth: 2,
        pointRadius: 2,
        // fill: true,
        tension: 0.3,
        label: `${server.label}`,
    });

    let after = new Date(0);
    let serverIdToArrIndex: Map<number, number> = new Map();
    const fetcher = async ({ chart }: { chart: Chart<'line'> }) => {
        const res = await axios.get<Res>(
            route('cpu-stats.index-api', {
                server_id: serverId,
                project_id: projectId,
                after,
            }),
        );
        const { data: resData } = res;
        // console.log({ data: resData });
        for (const server of resData.rows) {
            const last = server.cpu_stats[server.cpu_stats.length - 1];
            if (last !== undefined) {
                const date = new Date(last.updated_at ?? 0);
                if (after < date) {
                    after = date;
                }
            }
        }

        const newRows = resData.rows.map((server) => mapDataToChart(server));
        // we have the new data, we now need to append it to the existing data

        // if there is nothing already set than we can simply use the newData
        if (chart.data.datasets.length == 0) {
            chart.data.datasets = newRows;
            for (let i = 0; i < newRows.length; i++) {
                serverIdToArrIndex.set(resData.rows[i].id, i);
            }
            // console.log('early returned');
            return;
        }

        for (let i = 0; i < newRows.length; i++) {
            const mappedServer = newRows[i];
            const datasetIndex = serverIdToArrIndex.get(resData.rows[i].id);

            if (datasetIndex === undefined) {
                serverIdToArrIndex.set(resData.rows[i].id, chart.data.datasets.length);
                chart.data.datasets.push(mappedServer);
                // console.log(`got undefined index: ${resData.rows[i].id}`);
                continue;
            }

            // console.log('not early returned');
            for (const newPoint of mappedServer.data) {
                console.log({ newPoint });
                chart.data.datasets[datasetIndex].data.push(newPoint);
            }
        }
    };
</script>

<div class="card h-full">
    <TimeLineChart {fetcher} minY={0} suggestedMaxY={1.5} label="CPU load"></TimeLineChart>
</div>
