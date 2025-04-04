<script lang="ts">
    import { type Snippet } from 'svelte';
    import { route } from 'momentum-trail';
    import { page, router } from '@inertiajs/svelte';
    import Modal from '@/Components/Modal.svelte';
    import Link from '@/Components/Link.svelte';
    import Breadcrumb from '@/Components/Breadcrumb.svelte';
    import type { User } from '@/types';

    const { children, display_user }: { children: Snippet; display_user?: User } = $props();

    let displayDeleteModal = $state(false);

    let pageInfo = $derived.by(() => {
        if ($page.component === 'Users/Index') return { title: 'List' };
        if ($page.component === 'Users/Create') return { title: 'Create', label: 'Create User' };
        if ($page.component === 'Users/Show') return { title: 'Show' };
        if ($page.component === 'Users/Edit') return { title: 'Edit', label: 'Edit' };
    });
</script>

<svelte:head>
    <title>{pageInfo?.title}</title>
</svelte:head>

<div class="content-width">
    <header class="my-8 flex flex-wrap items-center justify-between">
        <Breadcrumb additionalText={pageInfo?.label}></Breadcrumb>
        <div class="flex flex-wrap gap-4">
            {#if $page.component !== 'Admin/Users/Index'}
                <Link href={route('users.index')} class="btn" underlined={false}>List</Link>
            {/if}
            {#if $page.component !== 'Admin/Users/Create'}
                <Link href={route('users.create')} class="btn" underlined={false}>Create</Link>
            {/if}
            {#if display_user}
                {#if $page.component !== 'Admin/Users/Show'}
                    <Link href={route('users.show', { user: display_user })} class="btn" underlined={false}>Show</Link>
                {/if}
                {#if $page.component !== 'Admin/Users/Edit'}
                    <Link href={route('users.edit', { user: display_user })} class="btn" underlined={false}>Edit</Link>
                {/if}
                <button
                    class="btn-error"
                    onclick={() => {
                        displayDeleteModal = true;
                    }}>Delete</button
                >
            {/if}
        </div>
    </header>
    {#if displayDeleteModal}
        {#snippet modalFooter()}
            <div class="flex gap-4">
                <button class="btn" onclick={() => (displayDeleteModal = false)}>Close</button>
                <button
                    class="btn-error"
                    onclick={() => {
                        router.delete(route('users.destroy', { user: display_user }), {
                            onFinish: () => {
                                displayDeleteModal = false;
                            },
                        });
                    }}>Delete</button
                >
            </div>
        {/snippet}
        <Modal bind:showModal={displayDeleteModal} footer={modalFooter}>
            <h2 class="subtitle">Delete this record?</h2>
        </Modal>
    {/if}
    {@render children()}
</div>
