<script lang="ts">
    import type { HTMLInputAttributes } from 'svelte/elements';
    import { uuidv7 } from 'uuidv7';

    let {
        id = uuidv7(),
        label,
        checked = $bindable(false),
        error,
        ...attrs
    }: HTMLInputAttributes & {
        checked?: boolean;
        label?: string;
        error?: string;
    } = $props();
</script>

<label class="flex max-w-max cursor-pointer flex-col">
    <div class="space-between flex items-center gap-2">
        <input class="checkbox" {id} {...attrs} type="checkbox" bind:checked />
        {#if label}
            <p class="label">{label}</p>
        {/if}
    </div>
    {#if error}
        <p class="error-text">{error}</p>
    {/if}
</label>

<style lang="scss">
    .checkbox {
        background: transparent;
        width: size(6);
        height: size(6);
        border-radius: size(2);
        border: solid 2px on-surface(1);
        position: relative;
        transition: all 100ms;
        &:focus {
            box-shadow: 0 0 0 #000;
            border-color: primary(5);
        }
        &:checked {
            background-color: primary(5);
            border-color: primary(5);
            opacity: 1;
            &:before {
                border-color: on-primary(1);
            }
        }
        &:before {
            content: '';
            position: absolute;
            right: calc(50% + 1px);
            top: 50%;
            width: 4px;
            height: 10px;
            border: solid transparent;
            border-width: 0 2px 2px 0;
            margin: -1px -1px 0 -1px;
            transform: rotate(45deg) translate(-50%, -50%);
            z-index: 2;
        }
    }
</style>
