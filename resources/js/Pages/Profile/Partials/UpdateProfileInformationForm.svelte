<script lang="ts">
    import { inertia, page, useForm } from '@inertiajs/svelte';
    import Input from '@/Components/Input.svelte';
    import Transition from 'svelte-transition';
    import { route } from 'momentum-trail';

    let {
        mustVerifyEmail,
        status,
    }: {
        mustVerifyEmail?: boolean;
        status?: string;
    } = $props();

    const user = $page.props.auth.user;
    const form = useForm({
        name: user.name,
        email: user.email,
    });

    function submit(e: SubmitEvent) {
        e.preventDefault();
        $form.patch(route('profile.update'));
    }
</script>

<form onsubmit={submit} class="flex flex-col gap-4">
    <header>
        <h2 class="subtitle">Profile Information</h2>
        <p>Update your account's profile information and email address.</p>
    </header>
    <Input
        label="Name"
        type="text"
        bind:value={$form.name}
        required
        autofocus
        autocomplete="name"
        error={$form.errors.name}
    />
    <Input
        label="Email"
        type="email"
        bind:value={$form.email}
        required
        autocomplete="username"
        error={$form.errors.email}
    />

    {#if mustVerifyEmail && user.email_verified_at === null}
        <p class="text-gray-800 dark:text-gray-200 mt-2 text-sm">
            Your email address is unverified.
            <button use:inertia={{ href: route('verification.send'), method: 'post' }} class="btn-primary">
                Click here to re-send the verification email.
            </button>
        </p>

        {#if status === 'verification-link-sent'}
            <div class="text-green-600 dark:text-green-400 mt-2 text-sm font-medium">
                A new verification link has been sent to your email address.
            </div>
        {/if}
    {/if}

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
