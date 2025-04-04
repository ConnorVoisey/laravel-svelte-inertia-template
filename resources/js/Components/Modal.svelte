<script lang="ts">
    import type { Snippet } from 'svelte';

    type Props = {
        showModal: boolean;
        children: Snippet;
        header?: Snippet;
        footer?: Snippet;
    };
    let { showModal = $bindable(), header, children, footer }: Props = $props();
    let dialog: HTMLDialogElement;

    $effect(() => {
        if (dialog)
            if (showModal) {
                console.log(showModal, 'open');
                dialog.showModal();
            } else {
                console.log('close modal');
                dialog.close();
            }
    });
</script>

<dialog
    bind:this={dialog}
    onclose={() => (showModal = false)}
    onclick={() => {
        dialog.close();
    }}
>
    <div onclick={(e) => e.stopPropagation()}>
        {#if header}
            {@render header()}
        {/if}
        {@render children()}
        {#if footer}
            {@render footer()}
        {:else}
            <hr />
            <button autofocus onclick={() => dialog.close()} class="btn-secondary-sink">Close</button>
        {/if}
    </div>
</dialog>

<style lang="scss">
    dialog {
        z-index: 100;
        max-width: 90vw;
        border-radius: 0.2em;
        border: none;
        padding: 0;
        background: hsl(var(--clr-surface-0));
        border-radius: 0.5rem;
        padding: 0.5rem;
        color: hsl(var(--clr-on-surface-0));
    }
    dialog::backdrop {
        background: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(0.1rem);
    }
    dialog > div {
        padding: 1em;
    }
    dialog[open] {
        animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    @keyframes zoom {
        from {
            transform: scale(0.95);
        }
        to {
            transform: scale(1);
        }
    }
    dialog[open]::backdrop {
        animation: fade 0.2s ease-out;
    }
    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    dialog > div {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
</style>
