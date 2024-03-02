<script>
    export let title = '';
    export let buttonShape = 'squircle';
    export let noBG = false;
</script>

<!-- You have to forward on:click here or the button won't work! -->
<!-- https://svelte.dev/tutorial/dom-event-forwarding -->

<button on:click {title} class={buttonShape} class:no-bg={noBG}>
    <slot />
</button>

<style>
    button {
        display: block;
        cursor: pointer;
        transition: 200ms;
        background-color: var(--color-off-white);
        border: 1px solid var(--color-gray);
        width: 2rem;
        height: 2rem;
        padding: 0;
    }

    button:hover,
    button:focus {
        background-color: var(--color-light-gray);
    }

    button:active {
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
        border-radius: 1rem;
    }

    /* BACKGROUND */
    .no-bg {
        background-color: transparent;
        border: 1px solid transparent;
    }
</style>