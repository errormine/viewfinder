<script>
    export let href = '/';
</script>

<a class="button" {href}>
    <slot>Button</slot>
</a>

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