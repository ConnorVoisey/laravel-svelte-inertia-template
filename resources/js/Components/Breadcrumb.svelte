<script lang="ts">
    import type Disks from '@/schemas/public/Disks';
    import type Projects from '@/schemas/public/Projects';
    import type Servers from '@/schemas/public/Servers';
    import type Services from '@/schemas/public/Services';
    import Link from './Link.svelte';
    import { route } from 'momentum-trail';
    import IconChevron from '~icons/mdi/chevron-right';

    type Props = {
        project?: Projects;
        server?: Servers;
        service?: Services;
        disk?: Disks;
        additionalText?: string;
    };
    let { project, server, service, disk, additionalText }: Props = $props();
</script>

<div class="flex items-end text-2xl">
    {#if project}
        <Link href={route('projects.show', { project })} class="flex items-center gap-2 text-on-surface-0">
            {project.name}
        </Link>
    {/if}
    {#if server}
        <IconChevron></IconChevron>
        <Link href={route('servers.show', { project, server })} class="flex items-center gap-2  text-on-surface-0">
            {server.label}
        </Link>
    {/if}
    {#if service}
        <IconChevron></IconChevron>
        <Link
            href={route('services.show', { project, server, service })}
            class="flex items-center gap-2  text-on-surface-0"
        >
            {service.name}
        </Link>
    {/if}
    {#if disk}
        <IconChevron></IconChevron>
        <Link
            href={route('disks.show', { project, server, service, disk })}
            class="flex items-center gap-2  text-on-surface-0"
        >
            {disk.mounted}
        </Link>
    {/if}
    {#if additionalText}
        {#if project != null}
            <IconChevron></IconChevron>
        {/if}
        {additionalText}
    {/if}
</div>
