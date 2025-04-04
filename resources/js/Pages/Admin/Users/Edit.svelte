<script lang="ts">
    import { route } from 'momentum-trail';
    import UpdateForm from './Partials/UpdateForm.svelte';
    import { useForm } from '@inertiajs/svelte';
    import type { UsersForm } from './types';
    import type Users from '@/schemas/public/Users';
    import Layout from './Layout.svelte';
    import type Projects from '@/schemas/public/Projects';
    type Props = {
        display_user: Users;
        projects: Projects[];
    };
    let { display_user, projects }: Props = $props();
    let form: UsersForm = $state(
        useForm({
            name: display_user.name,
            email: display_user.email,
        }),
    );

    function onsubmit(e: SubmitEvent) {
        e.preventDefault();
        $form.put(route('users.update', { user: display_user }));
    }
</script>

<!-- <pre>{JSON.stringify({ display_user, form: $form }, null, 2)}</pre> -->

<svelte:head>
    <title>User</title>
</svelte:head>

<Layout {display_user}>
    <UpdateForm {onsubmit} bind:form />
</Layout>
