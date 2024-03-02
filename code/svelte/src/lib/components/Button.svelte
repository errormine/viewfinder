<script>
    export let href = '/';
    export let onclick = null;
</script>

{#if onclick}
    <a class="button" {href} on:click|preventDefault={onclick}>
        <slot>Button</slot>
    </a>
{:else}
    <a class="button" {href}>
        <slot>Button</slot>
    </a>
{/if}

<style>
    .button {
        background: var(--color-primary-gradient);
        color: white;
        border: 1px solid var(--color-primary-dark);
        display: inline-block;
        text-align: center;
        padding: 0.5rem;
        border-radius: 100px;
        min-width: 5rem;
        height: 32px;
        text-decoration: none;
        font-weight: 500;
    }
</style>