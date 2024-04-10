<script>
    export let href = "";
    export let align = "center";
    export let type = "button";
    export let id = "";
    export let hidden = false;
</script>

{#if href != ""}
    <a {id} class="button align-{align}" {href} class:hidden={hidden}>
        <slot>Button</slot>
    </a>
{:else}
    <button {id} {type} class="button align-{align}" class:hidden={hidden} on:click>
        <slot>Button</slot>
    </button>
{/if}

<style>
    .button {
        background: var(--gradient-primary);
        color: white;
        border: 1px solid var(--color-primary-dark);
        display: block;
        text-align: center;
        padding: 0.5rem 1rem;
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
        margin: 0 auto;
    }
</style>
