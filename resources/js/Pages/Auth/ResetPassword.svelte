<script lang="ts">
    import GuestLayout from '@/Layouts/GuestLayout.svelte';
    import Input from '@/Components/Input.svelte';
    import { route } from 'momentum-trail';
    import { useForm } from '@inertiajs/svelte';

    let { email, token }: { email: string; token: string } = $props();

    const form = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    function submit(e: SubmitEvent) {
        e.preventDefault();

        $form.post(route('password.store'), {
            onFinish: () => $form.reset('password', 'password_confirmation'),
        });
    }
</script>

<svelte:head>
    <title>Reset Password</title>
</svelte:head>

<form onsubmit={submit} class="space-y-4">
    <legend class="title">Reset Password</legend>
    <Input
        label="Email"
        type="email"
        bind:value={$form.email}
        required
        autofocus
        autocomplete="username"
        error={$form.errors.email}
    />

    <Input
        label="Password"
        type="password"
        bind:value={$form.password}
        required
        autocomplete="new-password"
        error={$form.errors.password}
    />

    <Input
        label="Confirm Password"
        type="password"
        bind:value={$form.password_confirmation}
        required
        autocomplete="new-password"
        error={$form.errors.password_confirmation}
    />

    <button class="btn-primary" disabled={$form.processing}>Reset Password</button>
</form>
