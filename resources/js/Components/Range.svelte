<script lang="ts">
    import { uuidv7 } from 'uuidv7';
    import autoAnimate from '@formkit/auto-animate';
    import RangeSlider from 'svelte-range-slider-pips';

    let {
        id = uuidv7(),
        label,
        value = $bindable(),
        min,
        max,
        error,
        disabled = false,
    }: {
        value?: number;
        label?: string;
        id?: string;
        min: number;
        max: number;
        error?: string;
        disabled?: boolean;
    } = $props();
</script>

<div class="flex flex-col" use:autoAnimate>
    {#if label}
        <label for={id} class="label">{label}</label>
    {/if}
    <RangeSlider bind:value {min} {max} pips float all="label" {disabled}></RangeSlider>
    {#if error}
        <p class="error-text">
            {error}
        </p>
    {/if}
</div>

<style lang="scss">
    :global(div) {
        --range-slider: #{on-surface(0)};
        --range-handle-inactive: #{primary(5)}; /* inactive handle color */
        --range-handle: #{surface(0)}; /* non-focussed handle color */
        --range-handle-focus: #{primary(5)}; /* focussed handle color */
        --range-handle-border: var(--range-handle); /* handle border color */
        --range-range-inactive: var(--range-handle-inactive); /* inactive range bar background color */
        --range-range: var(--range-handle-focus); /* active range background color */
        --range-float-inactive: var(--range-handle-inactive); /* inactive floating label background color */
        --range-float: var(--range-handle-focus); /* floating label background color */
        --range-float-text: white; /* text color on floating label */
        --range-pip: #{on-surface(0)};
        --range-pip-text: #{on-surface(0)};
        --range-pip-active: #{primary(5)};
        --range-pip-active-text: #{primary(5)};
        --range-pip-hover: #{primary(4)};
        --range-pip-hover-text: #{primary(4)};
        --range-pip-in-range: #{primary(5)};
        --range-pip-in-range-text: #{primary(5)};
    }
</style>
