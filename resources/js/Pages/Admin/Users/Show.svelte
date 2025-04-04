<script lang="ts">
    import type { UserWithRolesAndPermissions } from '../../../types';
    import Layout from './Layout.svelte';
    type Props = {
        display_user: UserWithRolesAndPermissions;
    };
    const { display_user }: Props = $props();
</script>

<svelte:head>
    <title>Users</title>
</svelte:head>

<Layout {display_user}>
    <div class="card flex flex-col gap-2">
        <h2 class="subtitle">Details</h2>
        <p>Name: {display_user.name}</p>
        <p>Email: {display_user.email}</p>
    </div>
</Layout>
