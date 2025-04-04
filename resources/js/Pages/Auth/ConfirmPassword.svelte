<script lang="ts">
    import Input from '@/Components/Input.svelte';
    import { route } from 'momentum-trail';
    import { useForm } from '@inertiajs/svelte';

    const form = useForm({
        password: '',
    });

    function submit(e: SubmitEvent) {
        e.preventDefault();

        $form.post(route('password.confirm'), {
            onFinish: () => $form.reset(),
        });
    }
</script>

<svelte:head>
    <title>Confirm Password</title>
</svelte:head>

<div class="mb-4 text-sm">
    This is a secure area of the application. Please confirm your password before continuing.
</div>

<form onsubmit={submit}>
    <div>
        <Input
            label="Password"
            type="password"
            bind:value={$form.password}
            required
            autocomplete="current-password"
            autofocus
            error={$form.errors.password}
        />
    </div>

    <div class="mt-4 flex justify-end">
        <button class="btn-primary" disabled={$form.processing}>Confirm</button>
    </div>
</form>
