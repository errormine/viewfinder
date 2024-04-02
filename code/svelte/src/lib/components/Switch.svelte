<script>
    export let id='';
    export let name='';
</script>

<label class= 'switch'>
    <input type='checkbox' {id} {name}>
    <span class='slider'></span>
</label>

<style>
    .switch {
        --width: 2.5rem;
        --height: 1.2rem;
        --border-radius: calc(var(--height) / 2);
        --padding: 0.15rem;

        display: inline-block;
        position: relative;
        user-select: none;
    }

    .switch input {
        display: none;
    }

    .switch input:checked ~ .slider {
        background: var(--color-primary);
    }

    .switch input:checked ~ .slider::after {
        transform: translateX(calc(var(--width) - var(--height)));
    }

    .switch > .slider {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: var(--width);
        height: var(--height);
        border-radius: var(--border-radius);
        background: var(--color-dark-gray);
        transition: background-color 200ms;
    }

    .switch > .slider::after {
        content: '';
        position: absolute;
        top: -0.1rem;
        left: -0.1rem;
        width: calc(var(--height) + 0.2rem);
        height: calc(var(--height) + 0.2rem);
        border-radius: inherit;
        background: var(--gradient-gray);
        transition: transform 200ms;
        box-shadow: var(--small-shadow);
    }
</style>