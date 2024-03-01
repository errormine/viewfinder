<script>
    export let title = '';
    export let buttonShape = 'squircle';
    export let showBG = false;
</script>

<!-- You have to forward on:click here or the button won't work! -->
<!-- https://svelte.dev/tutorial/dom-event-forwarding -->

<button on:click {title} class={buttonShape} class:show-bg={showBG}>
    <slot />
</button>

<style>
    button {
        display: block;
        cursor: pointer;
        transition: 200ms;
        background-color: transparent;
        border: 1px solid transparent;
        width: 2rem;
        height: 2rem;
        padding: 0;
    }

    .squircle {
        border-radius: 0.5rem;
    }

    .show-bg,
    button:hover,
    button:focus {
        background-color: var(--color-off-white);
        border: 1px solid var(--color-gray);
    }

    button:active {
        background-color: var(--color-light-gray);
    }
</style>