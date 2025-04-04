<script lang="ts">
    import { inertia, useForm } from '@inertiajs/svelte';
    import GuestLayout from '@/Layouts/GuestLayout.svelte';
    import { route } from 'momentum-trail';

    let { status }: { status?: string } = $props();

    let verificationLinkSent = $derived(status === 'verification-link-sent');
    const form = useForm({});

    function submit(e: SubmitEvent) {
        e.preventDefault();

        $form.post(route('verification.send'));
    }
</script>

<svelte:head>
    <title>Email Verification</title>
</svelte:head>

<GuestLayout>
    <div class="text-gray-600 dark:text-gray-400 mb-4 text-sm">
        Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we
        just emailed to you? If you didn't receive the email, we will gladly send you another.
    </div>

    {#if verificationLinkSent}
        <div class="text-green-600 dark:text-green-400 mb-4 text-sm font-medium">
            A new verification link has been sent to the email address you provided during registration.
        </div>
    {/if}

    <form onsubmit={submit}>
        <div class="mt-4 flex items-center justify-between">
            <button class={$form.processing && 'opacity-25'} disabled={$form.processing}>
                Resend Verification Email
            </button>

            <button
                use:inertia={{ href: route('logout'), method: 'post' }}
                class="text-gray-600 hover:text-gray-900 focus:ring-indigo-500 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800 rounded-md text-sm underline focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
                Log Out
            </button>
        </div>
    </form>
</GuestLayout>
