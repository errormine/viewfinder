<script>
    import SearchBar from '$lib/components/SearchBar.svelte'
    import Button from '$lib/components/Button.svelte'

    let dialog;
</script>

<dialog class="login-dialog" bind:this={dialog}>
    <section class="login-wrapper">
        <button class="close-button" on:click={dialog.close()}>X</button>
        <header>
            <h2>Join Website</h2>
        </header>
        <p>Create an account to post photos, comment, and save photos from others.</p>
        <Button href="/auth/google">Log in with Google</Button>
    </section>
</dialog>
<header>
    <h1>Website</h1>
    <SearchBar />
    <Button href="/login" on:click={dialog.showModal()}>Log In</Button>
</header>

<style>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        background: var(--transparent-white-gradient);
        height: 4rem;
        position: fixed;
        top: 0;
        width: 100vw;
        backdrop-filter: blur(8px);
        z-index: 999;
    }

    header h1 {
        margin: 0;
    }
</style>