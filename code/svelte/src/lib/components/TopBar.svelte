<script>
    import SearchBar from '$lib/components/SearchBar.svelte'
    import Button from '$lib/components/Button.svelte'
</script>

<header class="top-bar">
    <h1>Website</h1>
    <SearchBar />
    <Button href="/auth/google">Log In</Button>
</header>

<style>
    .top-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        background: var(--color-white-gradient);
    }

    .top-bar h1 {
        margin: 0;
    }
</style>