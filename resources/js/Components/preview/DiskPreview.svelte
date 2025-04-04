<script lang="ts">
    import type DiskLogCurrents from '@/schemas/public/DiskLogCurrents';
    import type Disks from '@/schemas/public/Disks';
    type Props = {
        disk: Disks & {
            disk_log_current: DiskLogCurrents | null;
        };
    };
    let { disk }: Props = $props();

    let diskMapped = $derived({
        mounted: disk.mounted,
        usedPercentage:
            disk.disk_log_current == null
                ? 'No Data, unknown'
                : `${Number(disk.disk_log_current.used_percentage).toFixed(2)}%`,
        expectedFullAt:
            disk.disk_log_current?.expected_full_time == null
                ? 'No Data, unknown'
                : new Date(disk.disk_log_current?.expected_full_time).toLocaleString(),
    });
</script>

<p>Mounted: {diskMapped.mounted}</p>
<p>Used Percentage: {diskMapped.usedPercentage}</p>
<p>Expected Full At: {diskMapped.expectedFullAt}</p>
