<script lang="ts">
    import { route } from 'momentum-trail';
    import UpdateForm from './Partials/UpdateForm.svelte';
    import { useForm } from '@inertiajs/svelte';
    import type { UsersForm } from './types';
    import Layout from './Layout.svelte';
    let form: UsersForm = $state(
        useForm({
            name: '',
            email: '',
        }),
    );

    function onsubmit(e: SubmitEvent) {
        e.preventDefault();
        $form.post(route('users.store'));
    }
</script>

<svelte:head>
    <title>User</title>
</svelte:head>

<Layout>
    <UpdateForm {onsubmit} bind:form />
</Layout>
