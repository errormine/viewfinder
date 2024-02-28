<script>
    import LoginDialog from '$lib/forms/Login.svelte';
    import SearchBar from '$lib/components/SearchBar.svelte'
    import Button from '$lib/components/Button.svelte'

    let openLoginDialog = function() {
        const dialog = document.querySelector('.login-dialog')
        dialog.showModal()
    }
</script>

<LoginDialog />
<header>
    <h1>Website</h1>
    <SearchBar />
    <Button href="/login" onclick={openLoginDialog}>Log In</Button>
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