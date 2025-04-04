<script lang="ts">
    import TimeLineChart from '@/Components/charts/TimeLineChart.svelte';
    import axios from 'axios';
    import { route } from 'momentum-trail';
    import type { DateTime } from 'luxon';
    import type { Chart } from 'chart.js';
    import type Servers from '@/schemas/public/Servers';
    import type Disks from '@/schemas/public/Disks';
    import type DiskLogs from '@/schemas/public/DiskLogs';
    import type Projects from '@/schemas/public/Projects';

    type Props = {
        disk: Disks | null;
        server: Servers | null;
        project: Projects | null;
    };
    type Res = {
        servers: (Servers & {
            disks: (Disks & {
                disk_logs: DiskLogs[];
            })[];
        })[];
    };

    let { disk = null, server = null, project = null }: Props = $props();

    const mapDataToChart = (disk: Res['servers'][number]['disks'][number], server: Servers) => ({
        data: disk.disk_logs.map((log) => ({
            x: new Date(log.datetime).getTime(),
            y: log.used_percentage,
        })),
        borderWidth: 2,
        pointRadius: 2,
        // fill: true,
        tension: 0.3,
        label: `${server.label}: ${disk.mounted}`,
    });

    let after = new Date(0);
    const fetcher = async ({
        chart,
        diskDatasetIds,
    }: {
        chart: Chart<'line'>;
        startDate: DateTime;
        endDate: DateTime;
        diskDatasetIds: Record<number, { datasetI: number; lastDatetime: Date }>;
    }) => {
        const res = await axios.get<Res>(
            route('disk-stats.index-api', {
                diskId: disk?.id,
                serverId: server?.id,
                projectId: project?.id,
                after,
            }),
        );
        const { data: resData } = res;
        for (const server of resData.servers) {
            for (const disk of server.disks) {
                let diskDatasetMapper = diskDatasetIds[disk.id];
                let dataSet = chart.data.datasets[diskDatasetMapper?.datasetI];
                if (diskDatasetMapper === undefined) {
                    diskDatasetIds[disk.id] = {
                        lastDatetime: new Date(0),
                        datasetI: chart.data.datasets.length,
                    };
                    diskDatasetMapper = diskDatasetIds[disk.id];
                }
                let lastDatetime = new Date(diskDatasetMapper.lastDatetime);
                if (dataSet === undefined) {
                    chart.data.datasets.push(mapDataToChart(disk, server));
                    dataSet = chart.data.datasets[diskDatasetMapper?.datasetI];
                    for (const log of disk.disk_logs) {
                        const datetime = new Date(log.datetime);
                        if (datetime > diskDatasetMapper.lastDatetime) {
                            lastDatetime = datetime;
                        }
                    }
                } else {
                    for (const log of disk.disk_logs) {
                        const datetime = new Date(log.datetime);
                        if (datetime > diskDatasetMapper.lastDatetime) {
                            dataSet.data.push({
                                x: datetime.getTime(),
                                y: log.used_percentage,
                            });
                            if (datetime > lastDatetime) {
                                lastDatetime = datetime;
                            }
                        }
                    }
                }
                diskDatasetMapper.lastDatetime = lastDatetime;
            }
        }
        for (const server of resData.servers) {
            for (const disk of server.disks) {
                const last = disk.disk_logs[disk.disk_logs.length - 1];
                if (last !== undefined) {
                    const date = new Date(last.updated_at ?? 0);
                    if (after < date) {
                        after = date;
                    }
                }
            }
        }
    };
</script>

<div class="card h-full">
    <TimeLineChart {fetcher} minY={0} suggestedMaxY={100} label="Disk Usage"></TimeLineChart>
</div>
