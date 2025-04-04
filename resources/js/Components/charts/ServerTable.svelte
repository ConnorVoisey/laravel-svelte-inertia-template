<script lang="ts">
    import { route } from 'momentum-trail';
    import type { DiskWithServerCurrent } from '@/types';
    import Table from '@/Components/Table/Table.svelte';
    import axios from 'axios';
    import { onMount } from 'svelte';
    import { bytesToStr } from '@/utils';
    import type Servers from '@/schemas/public/Servers';
    import type Projects from '@/schemas/public/Projects';

    type Props = {
        project: Projects | null;
    };
    type FetchRes = {
        rows: (Servers & {
            project: Projects;
        })[];
        count: number;
    };

    const { project }: Props = $props();

    let fetchRes: FetchRes | null = $state(null);
    let isLoading = $state(false);
</script>

<Table
    {fetchRes}
    {isLoading}
    fetcher={async ({ columns, paginator }) => {
        isLoading = true;
        try {
            const res = await axios.get<FetchRes>(
                route('servers.index-api', {
                    project,
                }),
            );
            return {
                data: res.data,
                error: null,
            };
        } finally {
            isLoading = false;
        }
    }}
    columns={[
        {
            key: 'label',
            label: 'Label',
            cellRenderer: (row) => ({
                type: 'link',
                href: route('servers.show', { server: row, project }),
                text: row.label,
                highlightRowOnHover: true,
            }),
        },
        {
            key: 'host',
            label: 'Host',
            cellRenderer: (row) => ({
                type: 'link',
                href: route('servers.show', { server: row, project }),
                text: row.host,
                highlightRowOnHover: true,
            }),
        },
        {
            key: 'edit',
            label: 'Edit',
            cellRenderer: (row) => ({
                type: 'link',
                href: route('servers.edit', { server: row, project }),
                text: 'Edit',
                highlightRowOnHover: false,
            }),
        },
    ]}
></Table>
