<script lang="ts">
    import autoAnimate from '@formkit/auto-animate';
    import IconRequired from '~icons/mdi/asterisk';
    import Svelecte from 'svelecte';
    import { uuidv7 } from 'uuidv7';

    let {
        id = uuidv7(),
        options,
        value = $bindable(),
        label,
        error,
        required,
        multiple,
        labelAtTop = true,
    }: {
        id?: string;
        options: { label: string; value: string | number }[];
        value: string | number | object | any[] | null | undefined;
        label?: string;
        required?: boolean;
        error?: string;
        multiple?: boolean;
        labelAtTop?: boolean;
    } = $props();
</script>

<div class="select-wrapper flex items-center gap-x-2" class:flex-col={labelAtTop} use:autoAnimate>
    {#if label}
        <label for={id} class="label flex items-start gap-1">
            {label}
            {#if required}
                <IconRequired color="hsl(var(--clr-error-5))" width="0.9rem" height="0.9rem"></IconRequired>
            {/if}
        </label>
    {/if}
    <Svelecte {options} bind:value inputId={id} {multiple} />
    {#if error}
        <p class="error-text">
            {error}
        </p>
    {/if}
</div>

<style lang="scss">
    :global(.select-wrapper:focus-within) {
        --sv-border: 1px solid hsl(var(--clr-primary-5));
    }
    :global(.sv-control) {
        transition: 200ms border-color;
    }
    :global(.select-wrapper) {
        --sv-min-height: 40px;
        --sv-bg: #{surface(0)};
        --sv-disabled-bg: #eee;
        --sv-border: 1px solid hsl(var(--clr-on-surface-2));
        --sv-border-radius: 0.375rem;
        --sv-general-padding: #{size(2)};
        --sv-control-bg: var(--sv-bg);
        --sv-item-wrap-padding: 3px 3px 3px 6px;
        --sv-selection-wrap-padding: 3px 3px 3px 4px;
        --sv-selection-multi-wrap-padding: 3px 3px 3px 6px;
        --sv-item-selected-bg: #626262;
        --sv-item-btn-color: #{on-surface(0)};
        --sv-item-btn-color-hover: #{on-error(0)};
        --sv-item-btn-bg: #{surface(2)};
        --sv-item-btn-bg-hover: #{error(5)};
        --sv-icon-color: #bbb;
        --sv-icon-color-hover: #ccc;
        --sv-icon-bg: transparent;
        --sv-icon-size: #{size(5)};
        --sv-separator-bg: #626262;
        --sv-btn-border: 0;
        --sv-placeholder-color: #ccccd6;
        --sv-dropdown-bg: var(--sv-bg);
        --sv-dropdown-border: var(--sv-border);
        --sv-dropdown-offset: 1px;
        --sv-dropdown-width: auto;
        --sv-dropdown-shadow: 0 1px 3px #555;
        --sv-dropdown-height: 320px;
        --sv-dropdown-active-bg: #{primary(5)};
        --sv-dropdown-selected-bg: #{primary(5)};
        --sv-create-kbd-border: 1px solid #626262;
        --sv-create-kbd-bg: #626262;
        --sv-create-disabled-bg: #fcbaba;
        --sv-loader-border: 2px solid #626262;

        :global(div) {
            --sv-item-selected-bg: #{surface(2)};
        }
    }
</style>
