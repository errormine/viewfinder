<script>
    export let href = "";
    export let align = "center";
</script>

{#if href != ""}
    <a class="button align-{align}" {href}>
        <slot>Button</slot>
    </a>
{:else}
    <button class="button align-{align}" on:click>
        <slot>Button</slot>
    </button>
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
        cursor: pointer;
        user-select: none;
    }

    .button:hover {
        background: var(--color-primary-dark);
    }

    .align-right {
        float: right;
    }

    .align-center {
        margin: auto;
    }
</style>