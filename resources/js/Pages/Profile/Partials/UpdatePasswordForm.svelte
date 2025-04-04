<script lang="ts">
    import { useForm } from '@inertiajs/svelte';
    import Input from '@/Components/Input.svelte';
    import Transition from 'svelte-transition';
    import { route } from 'momentum-trail';

    let passwordInput: Input;
    let currentPasswordInput: Input;

    const form = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    function updatePassword(e: SubmitEvent) {
        e.preventDefault();
        $form.put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => $form.reset(),
            onError: () => {
                if ($form.errors.password) {
                    $form.reset('password', 'password_confirmation');
                    passwordInput?.focus();
                }
                if ($form.errors.current_password) {
                    $form.reset('current_password');
                    currentPasswordInput?.focus();
                }
            },
        });
    }
</script>

<form onsubmit={updatePassword} class="flex flex-col gap-4">
    <header>
        <h2 class="subtitle">Update Password</h2>
        <p>Ensure your account is using a long, random password to stay secure.</p>
    </header>
    <Input
        label="Current Password"
        bind:this={currentPasswordInput}
        bind:value={$form.current_password}
        type="password"
        autocomplete="current-password"
        error={$form.errors.current_password}
    />
    <Input
        label="New Password"
        bind:this={passwordInput}
        bind:value={$form.password}
        type="password"
        autocomplete="new-password"
        error={$form.errors.password}
    />
    <Input
        label="Confirm Password"
        bind:value={$form.password_confirmation}
        type="password"
        autocomplete="new-password"
        error={$form.errors.password_confirmation}
    />
    <div class="flex items-center gap-4">
        <button disabled={$form.processing} class="btn-primary">Save</button>

        <Transition
            show={$form.recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveFrom="opacity-0"
        >
            <p class="text-success-5 transition ease-in-out">Saved.</p>
        </Transition>
    </div>
</form>
