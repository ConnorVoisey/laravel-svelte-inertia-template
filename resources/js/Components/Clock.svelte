<script lang="ts">
    import NumberFlow, { NumberFlowGroup } from '@number-flow/svelte';
    import { onMount } from 'svelte';

    let now = new Date();
    onMount(() => {
        const nowInterval = setInterval(() => (now = new Date()), 1000);
        return () => {
            clearInterval(nowInterval);
        };
    });
</script>

<NumberFlowGroup>
    <div class="title flex">
        <NumberFlow trend={1} value={now.getHours()} format={{ minimumIntegerDigits: 2 }} />
        <NumberFlow
            prefix=":"
            trend={1}
            value={now.getMinutes()}
            digits={{ 1: { max: 5 } }}
            format={{ minimumIntegerDigits: 2 }}
        />
        <NumberFlow
            prefix=":"
            trend={1}
            value={now.getSeconds()}
            digits={{ 1: { max: 5 } }}
            format={{ minimumIntegerDigits: 2 }}
        />
    </div>
</NumberFlowGroup>
