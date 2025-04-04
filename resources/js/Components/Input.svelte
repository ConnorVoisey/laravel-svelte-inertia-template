<script lang="ts">
    import { onMount } from 'svelte';
    import IconRequired from '~icons/mdi/asterisk';
    import type { HTMLInputAttributes } from 'svelte/elements';
    import { uuidv7 } from 'uuidv7';
    import autoAnimate from '@formkit/auto-animate';

    let {
        id = uuidv7(),
        name = id,
        label,
        value = $bindable(),
        error,
        description,
        ...attrs
    }: HTMLInputAttributes & {
        value?: string | number | null;
        label?: string;
        id?: string;
        error?: string;
        description?: string;
    } = $props();

    let input: HTMLInputElement;

    export function focus() {
        input?.focus();
    }

    onMount(() => {
        if (attrs.autofocus && input) {
            input.focus();
        }
    });
</script>

<div class="flex flex-col gap-1" use:autoAnimate>
    {#if label}
        <label for={id} class="label flex items-start gap-1">
            {label}
            {#if attrs.required}
                <IconRequired color="hsl(var(--clr-error-5))" width="0.8rem" height="0.8rem"></IconRequired>
            {/if}
        </label>
    {/if}
    <input
        {id}
        {name}
        {...attrs}
        class="rounded-md border-on-surface-2 bg-surface-0 shadow-sm focus:border-primary-5 focus:ring-primary-5"
        bind:value
        bind:this={input}
    />
    {#if description}
        <p class="text-sm">
            {description}
        </p>
    {/if}
    {#if error}
        <p class="error-text">
            {error}
        </p>
    {/if}
</div>

<style lang="scss">
    input {
        transition: border 200ms;
        &[disabled] {
            opacity: 0.6;
        }
    }
</style>
