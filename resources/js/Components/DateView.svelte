<script lang="ts">
    import NumberFlow, { NumberFlowGroup } from '@number-flow/svelte';

    type Props = {
        date: Date;
        trend?: number;
        includeDate?: boolean;
    };
    let { date, trend = 1, includeDate = true }: Props = $props();
</script>

<div class="wrapper">
    <NumberFlowGroup>
        <div class="flex">
            {#if includeDate}
                <NumberFlow
                    {trend}
                    value={date.getFullYear()}
                    format={{ minimumIntegerDigits: 2, useGrouping: false }}
                />
                <NumberFlow
                    prefix="/"
                    {trend}
                    value={date.getMonth() + 1}
                    digits={{ 1: { max: 5 } }}
                    format={{ minimumIntegerDigits: 2 }}
                />
                <NumberFlow
                    prefix="/"
                    {trend}
                    value={date.getDate()}
                    digits={{ 1: { max: 5 } }}
                    format={{ minimumIntegerDigits: 2 }}
                />
            {/if}
            <NumberFlow prefix=" " {trend} value={date.getHours()} format={{ minimumIntegerDigits: 2 }} />
            <NumberFlow
                prefix=":"
                {trend}
                value={date.getMinutes()}
                digits={{ 1: { max: 5 } }}
                format={{ minimumIntegerDigits: 2 }}
            />
            <NumberFlow
                prefix=":"
                {trend}
                value={date.getSeconds()}
                digits={{ 1: { max: 5 } }}
                format={{ minimumIntegerDigits: 2 }}
            />
        </div>
    </NumberFlowGroup>
</div>

<style lang="scss">
    .wrapper {
        font-family: 'Space Mono', serif;
        font-optical-sizing: auto;
    }
</style>
