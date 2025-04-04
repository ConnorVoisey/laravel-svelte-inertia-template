<script lang="ts">
    import autoAnimate from '@formkit/auto-animate';
    import Input from '@/Components/Input.svelte';
    import { route } from 'momentum-trail';
    import { useForm, inertia } from '@inertiajs/svelte';

    let { status }: { status?: string } = $props();

    const form = useForm({
        email: '',
    });

    function submit(e: SubmitEvent) {
        e.preventDefault();

        $form.post(route('password.email'));
    }
</script>

<svelte:head>
    <title>Forgot Password</title>
</svelte:head>

<form onsubmit={submit} class="flex flex-col gap-4" use:autoAnimate>
    <h1 class="title">Forgot Password</h1>
    <p class="text-sm text-on-surface-0">
        Forgot your password? No problem. Just let us know your email address and we will email you a password reset
        link that will allow you to choose a new one.
    </p>

    {#if status}
        <div class="text-sm font-medium text-success-5">
            {status}
        </div>
    {/if}

    <div>
        <Input
            label="Email"
            type="email"
            bind:value={$form.email}
            required
            autofocus
            autocomplete="username"
            error={$form.errors.email}
        />
    </div>

    <button class="btn-primary" disabled={$form.processing}> Email Password Reset Link </button>
</form>
