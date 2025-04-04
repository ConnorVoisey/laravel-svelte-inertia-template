<script lang="ts">
    // This really shouldnt have to be a component but inertia needs the use:inertia to not do a full page reload
    import { inertia } from '@inertiajs/svelte';
    import type { Snippet } from 'svelte';
    import type { HTMLAnchorAttributes } from 'svelte/elements';
    type Props = {
        href: string;
        children: Snippet;
        underlined?: boolean;
    } & HTMLAnchorAttributes;
    let { href, children, underlined = true, ...attrs }: Props = $props();
</script>

<!-- Inerita seems to not correctly reconstruct the event handler for the use:inertia thing when the link changes. -->
<!-- To get around this wrap it in a key so that the entire component is recreated when the link changes. -->
<!-- This will cause animations and other effects to stop playing when the href is changed -->
{#key href}
    <a {href} class:link={underlined} use:inertia={{ prefetch: true, cacheFor: 3000 }} {...attrs}
        >{@render children()}</a
    >
{/key}
