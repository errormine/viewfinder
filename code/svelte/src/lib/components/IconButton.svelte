<script>
    export let title = '';
    export let showBG = false;
</script>

<!-- You have to forward on:click here or the button won't work! -->
<!-- https://svelte.dev/tutorial/dom-event-forwarding -->

<button on:click {title} class="round-corners" class:show-bg={showBG}>
    <slot />
</button>

<style>
    button {
        display: block;
        cursor: pointer;
        padding: 0.5rem;
        transition: 200ms;
        background-color: transparent;
        border: 1px solid transparent;
        height: 2rem;
        width: 2rem;
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