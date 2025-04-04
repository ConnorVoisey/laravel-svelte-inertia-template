<script lang="ts">
    import DeleteUserForm from './Partials/DeleteUserForm.svelte';
    import UpdatePasswordForm from './Partials/UpdatePasswordForm.svelte';
    import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm.svelte';

    let {
        mustVerifyEmail,
        status,
    }: {
        mustVerifyEmail?: boolean;
        status?: string;
    } = $props();
</script>

<svelte:head>
    <title>Profile</title>
</svelte:head>

<div class="my-8">
    <div class="content-width flex flex-col gap-8">
        <h1 class="title">Profile</h1>
        <div class="card">
            <UpdateProfileInformationForm {mustVerifyEmail} {status} />
        </div>

        <div class="card">
            <UpdatePasswordForm />
        </div>

        <div class="card">
            <DeleteUserForm />
        </div>
    </div>
</div>
