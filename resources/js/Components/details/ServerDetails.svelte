<script lang="ts">
    import type DiskLogCurrents from '@/schemas/public/DiskLogCurrents';
    import type Disks from '@/schemas/public/Disks';
    import type Projects from '@/schemas/public/Projects';
    import type Servers from '@/schemas/public/Servers';
    import DiskPreview from '@/Components/preview/DiskPreview.svelte';
    type Props = {
        server: Servers & {
            project: Projects;
            disks: (Disks & {
                disk_log_current: DiskLogCurrents | null;
            })[];
        };
    };
    let { server }: Props = $props();
    console.log({ server });
</script>

<p>{server.label}</p>
<p>{server.host}</p>
<hr />
<h3 class="subtitle">Disks</h3>
<div class="flex flex-wrap gap-4">
    {#each server.disks as disk}
        <div class="card">
            <DiskPreview {disk}></DiskPreview>
        </div>
    {/each}
</div>
