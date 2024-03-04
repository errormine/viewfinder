<script>
    export let label = '';
    export let href = '';
    export let text = '';
</script>

<section class="bubble">
    <p class="label">{label}</p>
    {#if href}
        <a {href}>{href.replace("mailto:", "")}</a>
    {:else}
        <p class="text">{text || "None provided."}</p>
    {/if}
</section>

<style>
    .bubble {
        background: var(--color-gray-gradient);
        border-radius: 0.5rem;
        padding: 0.8rem;
    }

    .bubble > * {
        display: inline-block;
        margin: 0;
    }

    .bubble > .label {
        color: var(--color-dark-gray);
        margin-right: 1rem;
    }
    
    .bubble > a {
        color: var(--color-primary);
    }
</style>