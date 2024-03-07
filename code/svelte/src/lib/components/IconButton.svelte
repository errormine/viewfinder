<script>
    export let href = '';
    export let name = '';
    export let title = '';
    export let shape = 'squircle';
    export let hoverable = true;
    export let disableBackground = false;
</script>

<!-- You have to forward on:click here or the button won't work! -->
<!-- https://svelte.dev/tutorial/dom-event-forwarding -->

{#if href}
    <a {href} class="button {shape}" {title} class:hoverable={hoverable} class:no-bg={disableBackground}>
        <slot />
    </a>
{:else}
    <button on:click {name} {title} class="button {shape}" class:hoverable={hoverable} class:no-bg={disableBackground}>
        <slot />
    </button>
{/if}

<style>
    .button {
        display: block;
        cursor: pointer;
        transition: 200ms;
        background-color: var(--color-off-white);
        border: 1px solid var(--color-gray);
        width: 2rem;
        height: 2rem;
        padding: 0;
        position: relative;
    }

    .button.hoverable:hover,
    .button.hoverable:focus {
        background-color: var(--color-light-gray);
    }

    .button.hoverable:active {
        background-color: var(--color-gray);
    }

    /* SHAPES */
    .square {
        border-radius: 0.2rem;
    }

    .squircle {
        border-radius: 0.5rem;
    }

    .circle {
        border-radius: 50%;
    }

    /* BACKGROUND */
    .no-bg {
        background-color: transparent;
        border: 1px solid transparent;
    }
</style>