<script lang="ts">
    import { route } from 'momentum-trail';
    import type { DiskWithServerCurrent } from '@/types';
    import Table from '@/Components/Table/Table.svelte';
    import axios from 'axios';
    import { bytesToStr } from '@/utils';
    import type Disks from '@/schemas/public/Disks';
    import type Servers from '@/schemas/public/Servers';
    import type Projects from '@/schemas/public/Projects';

    type Props = {
        server: Servers;
        project: Projects;
        displayPaginator?: boolean;
    };
    type FetchRes = { rows: DiskWithServerCurrent[]; count: number };

    const { project, server, displayPaginator = true }: Props = $props();

    const diskRoute = (disk: Disks) => route('disks.show', { disk, project, server });
</script>

<Table
    fetchRes={null}
    fetcher={async () => {
        const res = await axios.get<FetchRes>(
            route('disks.index-api', {
                server_id: server.id,
            }),
        );
        return { data: res.data, error: null };
    }}
    columns={[
        {
            key: 'server',
            label: 'Server',
            hidden: server.id !== null,
            cellRenderer: (row) => ({
                type: 'link',
                href: route('servers.show', { server: row.server, project }),
                text: row.server.label,
                highlightRowOnHover: false,
            }),
        },
        {
            key: 'mounted',
            label: 'Mounted',
            cellRenderer: (row) => ({
                type: 'link',
                href: diskRoute(row),
                text: row.mounted,
                highlightRowOnHover: true,
            }),
        },
        {
            key: 'used_percentage',
            label: 'Used Percentage',
            cellRenderer: (row) => ({
                type: 'link',
                href: diskRoute(row),
                text: `${Number(row.disk_log_current?.used_percentage).toFixed(2)}%`,
                highlightRowOnHover: true,
            }),
        },
        {
            key: 'total',
            label: 'Total',
            cellRenderer: (row) => ({
                type: 'link',
                href: diskRoute(row),
                text: bytesToStr(Number(row.disk_log_current?.total)),
                highlightRowOnHover: true,
            }),
        },
        {
            key: 'used',
            label: 'Used',
            cellRenderer: (row) => ({
                type: 'link',
                href: diskRoute(row),
                text: bytesToStr(Number(row.disk_log_current?.used)),
                highlightRowOnHover: true,
            }),
        },
        {
            key: 'used_alert_percentage',
            label: 'Alert Level',
            cellRenderer: (row) => ({
                type: 'link',
                href: diskRoute(row),
                text: `${row.used_alert_percentage}%`,
                highlightRowOnHover: true,
            }),
        },
        {
            key: 'edit',
            label: 'Edit',
            cellRenderer: (row) => ({
                type: 'link',
                href: route('disks.edit', { disk: row, project, server }),
                text: 'Edit',
                highlightRowOnHover: false,
            }),
        },
    ]}
    {displayPaginator}
></Table>
