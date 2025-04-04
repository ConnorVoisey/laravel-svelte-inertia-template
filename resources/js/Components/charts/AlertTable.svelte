<script lang="ts">
    import { route } from 'momentum-trail';
    import type { AlertFull } from '@/types';
    import Table from '@/Components/Table/Table.svelte';
    import axios from 'axios';
    import type Disks from '@/schemas/public/Disks';
    import type Servers from '@/schemas/public/Servers';
    import type Projects from '@/schemas/public/Projects';
    import type Services from '@/schemas/public/Services';
    import { mapAlertSourceToMsg } from '@/Pages/Alerts/mapSource';

    type Props = {
        project?: Projects | null;
        server?: Servers | null;
        service?: Services | null;
        disk?: Disks | null;
    };
    type FetchRes = { rows: (AlertFull & { server: Servers & { project: Projects } })[]; count: number };

    const { project = null, server = null, service = null, disk = null }: Props = $props();

    const alertRoute = (alert: AlertFull) =>
        route('alerts.show', {
            alert,
        });
</script>

<Table
    fetchRes={null}
    fetcher={async () => {
        const res = await axios.get<FetchRes>(
            route('alerts.index-api', {
                project_id: project?.id,
                server_id: server?.id,
                disk_id: disk?.id,
                service_id: service?.id,
            }),
        );
        return { data: res.data, error: null };
    }}
    columns={[
        {
            key: 'resolved_at',
            label: 'Resolved At',
            cellRenderer: (row) => ({
                type: 'link',
                href: alertRoute(row),
                text: row.resolved_at?.toString() ?? 'Not Resolved',
                highlightRowOnHover: true,
            }),
        },
        {
            key: 'project',
            label: 'Project',
            hidden: project?.id != null,
            cellRenderer: (row) => ({
                type: 'link',
                href: alertRoute(row),
                text: row.server?.project?.name,
                highlightRowOnHover: true,
            }),
        },
        {
            key: 'server',
            label: 'Server',
            hidden: server?.id != null,
            cellRenderer: (row) => ({
                type: 'link',
                href: alertRoute(row),
                text: row.server.label,
                highlightRowOnHover: true,
            }),
        },
        {
            key: 'disk',
            label: 'Disk',
            hidden: disk?.id != null,
            cellRenderer: (row) => ({
                type: 'link',
                href: alertRoute(row),
                text: row.disk?.mounted ?? 'unknown',
                highlightRowOnHover: true,
            }),
        },
        {
            key: 'source',
            label: 'Source',
            cellRenderer: (row) => ({
                type: 'link',
                href: alertRoute(row),
                text: mapAlertSourceToMsg(row, { service: row.service, disk: row.disk }),
                highlightRowOnHover: true,
            }),
        },
        {
            key: 'message',
            label: 'Message',
            cellRenderer: (row) => ({
                type: 'link',
                href: alertRoute(row),
                text: row.message ?? 'unknown',
                highlightRowOnHover: true,
            }),
        },
        {
            key: 'service',
            label: 'Service',
            hidden: service?.id != null,
            cellRenderer: (row) => ({
                type: 'link',
                href: alertRoute(row),
                text: row.service?.name ?? 'unknown',
                highlightRowOnHover: true,
            }),
        },
    ]}
></Table>
