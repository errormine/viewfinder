<script>
    export let label = '';
    export let href = '';
</script>

<article class="bubble">
    <p>{label}</p>
    <a {href}>{href.replace("mailto:", "")}</a>
</article>

<style>
    article {
        background: var(--color-gray-gradient);
        border-radius: 0.5rem;
        padding: 0.8rem;
    }

    article > * {
        display: inline-block;
    }

    article > p {
        margin: 0;
        margin-right: 1rem;
    }

    article > a {
        color: var(--color-primary);
    }
</style>