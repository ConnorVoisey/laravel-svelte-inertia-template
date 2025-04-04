<script lang="ts">
    import { useForm } from '@inertiajs/svelte';
    import Modal from '@/Components/Modal.svelte';
    import Input from '@/Components/Input.svelte';
    import { route } from 'momentum-trail';

    let confirmingUserDeletion = $state(false);
    let passwordInput: Input;

    const form = useForm({
        password: '',
    });

    function closeModal() {
        confirmingUserDeletion = false;
        $form.reset();
    }

    function confirmUserDeletion() {
        confirmingUserDeletion = true;
        setTimeout(() => passwordInput?.focus(), 250);
    }

    function deleteUser() {
        $form.delete(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput?.focus(),
            onFinish: () => $form.reset(),
        });
    }
</script>

<section class="space-y-6">
    <header>
        <h2 class="subtitle">Delete Account</h2>
        <p>
            Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting
            your account, please download any data or information that you wish to retain.
        </p>
    </header>

    <button onclick={confirmUserDeletion} class="btn-primary">Delete Account</button>

    <Modal show={confirmingUserDeletion} onclose={closeModal}>
        <div class="flex flex-col gap-4 p-4">
            <h2 class="subtitle">Are you sure you want to delete your account?</h2>

            <p>
                Once your account is deleted, all of its resources and data will be permanently deleted. Please enter
                your password to confirm you would like to permanently delete your account.
            </p>

            <Input
                label="Password"
                bind:this={passwordInput}
                bind:value={$form.password}
                type="password"
                placeholder="Password"
                onkeyup={(e: KeyboardEvent) => e.key === 'Enter' && deleteUser()}
                error={$form.errors.password}
            />

            <div class="flex justify-end gap-4">
                <button onclick={closeModal} class="btn">Cancel</button>
                <button class="btn-primary" disabled={$form.processing} onclick={deleteUser}> Delete Account </button>
            </div>
        </div>
    </Modal>
</section>
