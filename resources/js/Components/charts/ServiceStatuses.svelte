<script lang="ts">
    import type Services from '@/schemas/public/Services';
    import IconDotsVertical from '~icons/mdi/dots-vertical';
    import type ServiceLogs from '@/schemas/public/ServiceLogs';
    import axios from 'axios';
    import { route } from 'momentum-trail';
    import type Projects from '@/schemas/public/Projects';
    import type Servers from '@/schemas/public/Servers';
    import Table from '@/Components/Table/Table.svelte';
    import DateView from '../DateView.svelte';
    type Props = {
        server: Servers;
        project: Projects;
        displayPaginator?: boolean;
    };
    const { server, project, displayPaginator }: Props = $props();
    type ServiceWithActiveLog = Services &
        ServiceLogs & {
            server: Servers & {
                project: Projects;
            };
        };
    const serviceRoute = (service: Services) => route('services.show', { project, server, service });
</script>

{#snippet startedStateAt(row: ServiceWithActiveLog)}
    {#if row.start_datetime}
        <DateView date={new Date(row.start_datetime)}></DateView>
    {:else}
        <p class="text-on-error-1">Never Polled</p>
    {/if}
{/snippet}

{#snippet lastPolledAt(row: ServiceWithActiveLog)}
    {#if row.last_poll_at}
        <DateView date={new Date(row.last_poll_at)}></DateView>
    {:else}
        <p class="text-on-error-1">Never Polled</p>
    {/if}
{/snippet}

<Table
    paginator={{ limit: 10, offset: 0 }}
    fetcher={async () => {
        const res = await axios.get<{ rows: ServiceWithActiveLog[]; count: number }>(
            route('services.active-api', {
                server_id: server.id,
            }),
        );
        return { data: res.data, error: null };
    }}
    columns={[
        {
            key: 'service_name',
            label: 'Service Name',
            cellRenderer: (row) => ({
                type: 'link',
                href: serviceRoute(row),
                text: row.name,
                highlightRowOnHover: true,
            }),
        },
        {
            key: 'active_state',
            label: 'Active State',
            cellRenderer: (row) => ({
                type: 'link',
                href: serviceRoute(row),
                text: row.active_state ?? 'Never Polled',
                highlightRowOnHover: true,
                highlightError: row.active_state === 'inactive' || row.active_state == null,
            }),
        },
        {
            key: 'sub_state',
            label: 'Sub State',
            cellRenderer: (row) => ({
                type: 'link',
                href: serviceRoute(row),
                text: row?.sub_state ?? 'Never Polled',
                highlightRowOnHover: true,
                highlightError: row.sub_state === 'dead' || row.sub_state == null,
            }),
        },
        {
            key: 'started_state_at',
            label: 'Started State at',
            cellRenderer: (row) => ({
                type: 'link',
                href: serviceRoute(row),
                snippet: startedStateAt,
                // text: row.start_datetime ? row.start_datetime.toLocaleString() : 'Never polled',
                highlightRowOnHover: true,
                highlightError: row.start_datetime == null,
            }),
        },
        {
            key: 'last_polled_at',
            label: 'Last Polled at',
            cellRenderer: (row) => ({
                type: 'link',
                snippet: lastPolledAt,
                href: serviceRoute(row),
                // text: row.last_poll_at ? row.last_poll_at.toLocaleString() : 'Never polled',
                highlightRowOnHover: true,
                highlightError: row.last_poll_at == null,
            }),
        },
        {
            key: 'edit',
            label: 'Edit',
            cellRenderer: (row) => ({
                type: 'link',
                href: route('services.edit', { service: row, project, server }),
                text: 'Edit',
                highlightRowOnHover: false,
            }),
        },
    ]}
    {displayPaginator}
></Table>

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
