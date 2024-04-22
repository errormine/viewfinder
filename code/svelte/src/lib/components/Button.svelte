<script>
    export let href = "";
    export let align = "center";
    export let type = "button";
    export let id = "";
    export let hidden = false;
    export let color = "primary";
</script>

{#if href != ""}
    <a {id} class="button align-{align} {color}" {href} class:hidden={hidden}>
        <slot>Button</slot>
    </a>
{:else}
    <button {id} {type} class="button align-{align} {color}" class:hidden={hidden} on:click>
        <slot>Button</slot>
    </button>
{/if}

<style>
    .button {
        display: block;
        text-align: center;
        padding: 0.5rem 1rem;
        border-radius: 100px;
        min-width: 5rem;
        width: fit-content;
        height: 32px;
        text-decoration: none;
        font-weight: 500;
        cursor: pointer;
        user-select: none;
    }

    .button.primary {
        background: var(--gradient-primary);
        border: 1px solid var(--color-primary-dark);
        color: white;
    }

    .button.gray {
        background: var(--gradient-dark-gray);
        border: 1px solid var(--color-gray);
        color: black;
    }

    .button.primary:hover {
        background: var(--color-primary-dark);
    }

    .button.gray:hover {
        background: var(--color-darkish-gray);
    }

    .align-right {
        float: right;
    }

    .align-center {
        margin: 0 auto;
    }
</style>
