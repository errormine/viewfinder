<script>
    export let label = '';
    export let href = '';
</script>

<section class="bubble">
    <p>{label}</p>
    <a {href}>{href.replace("mailto:", "")}</a>
</section>

<style>
    .bubble {
        background: var(--color-gray-gradient);
        border-radius: 0.5rem;
        padding: 0.8rem;
    }

    .bubble > * {
        display: inline-block;
    }

    .bubble > p {
        margin: 0;
        margin-right: 1rem;
    }

    .bubble > a {
        color: var(--color-primary);
    }
</style>