<script lang="ts">
    import Input from '@/Components/Input.svelte';
    import type { UsersForm } from '../types';

    let { form = $bindable(), onsubmit }: { form: UsersForm; onsubmit: (e: SubmitEvent) => void } = $props();
</script>

<section>
    <form {onsubmit} class="card space-y-4">
        <legend class="subtitle">Details</legend>
        <Input label="Name" error={$form.errors.name} bind:value={$form.name} type="text" />
        <Input label="Email" error={$form.errors.email} bind:value={$form.email} type="email" />

        <div class="flex items-center gap-4">
            <button disabled={$form.processing} class="btn-primary">Save</button>
        </div>
    </form>
</section>
