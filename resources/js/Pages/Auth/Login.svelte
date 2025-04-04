<script lang="ts">
    import Checkbox from '@/Components/Checkbox.svelte';
    import Input from '@/Components/Input.svelte';
    import { inertia, useForm } from '@inertiajs/svelte';
    import { route } from 'momentum-trail';

    let {
        canResetPassword,
        status,
    }: {
        canResetPassword?: boolean;
        status?: string;
    } = $props();

    const form = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e: SubmitEvent) => {
        e.preventDefault();

        $form.post(route('login'), {
            onFinish: () => $form.reset('password'),
        });
    };
</script>

<svelte:head>
    <title>Log in</title>
</svelte:head>

{#if status}
    <div class="mb-4 text-sm font-medium text-success-5">
        {status}
    </div>
{/if}

<form onsubmit={submit} class="flex flex-col gap-4">
    <h1 class="title">Login</h1>
    <Input
        type="email"
        bind:value={$form.email}
        required
        autofocus
        autocomplete="username"
        label="Email"
        error={$form.errors.email}
    />
    <Input
        label="Password"
        id="password"
        type="password"
        bind:value={$form.password}
        required
        autocomplete="current-password"
        error={$form.errors.password}
    />

    <div class="flex flex-wrap justify-between gap-8">
        <Checkbox label="Remember me" bind:checked={$form.remember} />

        {#if canResetPassword}
            <a use:inertia={{ prefetch: true }} href={route('password.request')} class="link">
                Forgot your password?
            </a>
        {/if}
    </div>

    <button class="btn-primary {$form.processing && 'opacity-25'}" disabled={$form.processing}>Log in</button>
</form>
