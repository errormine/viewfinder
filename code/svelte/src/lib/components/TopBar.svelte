<script>
    import { page } from '$app/stores';
    import { Gear16, Person16, SignOut16, Upload16, X16 } from 'svelte-octicons';
    import SearchBar from '$lib/components/SearchBar.svelte';
    import ActionBar from '$lib/components/ActionBar.svelte';
    import Button from '$lib/components/Button.svelte';
    import IconButton from '$lib/components/IconButton.svelte';
    import UserPortrait from '$lib/components/UserPortrait.svelte';

    let dialog;
</script>

<dialog class="login-dialog round-corners" bind:this={dialog}>
    <section class="login-wrapper">
        <header class="flex space-between margin-bottom-1">
            <h2>Join Website</h2>
            <IconButton on:click={dialog.close()}>
                <X16 />
            </IconButton>
        </header>
        <p>Create an account to post photos, comment, and save photos from others.</p>
        <Button href={"/auth/google"}>Log in with Google</Button>
    </section>
</dialog>
<header class="top-bar">
    <nav>
        <h1><a href="/">Website</a></h1>
        {#if $page.data.loggedIn}
            <ul>
                <li class:active={ $page.url.pathname === "/feed" }>
                    <a href="/feed">Feed</a>
                </li>
                <li class:active={ $page.url.pathname === "/explore" }>
                    <a href="/explore">Explore</a>
                </li>
            </ul>
        {/if}
    </nav>
    {#if $page.data.loggedIn}
        <ActionBar>
            <SearchBar size="small" />
            <IconButton href="/upload" shape={"circle"}>
                <Upload16 title={"Upload"}/>
            </IconButton>
            <UserPortrait username={$page.data.user.username} src={$page.data.user.picture} size={2} color={"gray"}/>
            <ul class="profile-actions round-corners">
                <li>
                    <a href="/user/{$page.data.user.username}"><Person16 /> Profile</a>
                </li>
                <hr />
                <li>
                    <a href="/settings"><Gear16 /> Settings</a>
                </li>
                <hr />
                <li>
                    <a href="/auth/logout" data-sveltekit-reload><SignOut16 /> Log Out</a>
                </li>
            </ul>
        </ActionBar>
    {:else}
        <SearchBar size="large" />
        <Button on:click={dialog.showModal()} align={"right"}>Log In</Button>
    {/if}
</header>

<style>
    .login-dialog {
        max-width: 20rem;
    }

    .login-dialog h2 {
        font-size: 2rem;
        margin: 0;
    }

    .top-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        background: var(--transparent-white-gradient);
        height: 4rem;
        position: fixed;
        top: 0;
        width: 100%;
        backdrop-filter: blur(8px);
        z-index: 999;
    }

    .top-bar h1 {
        margin: 0;
    }

    .top-bar a {
        display: block;
        text-decoration: none;
        color: black;
    }

    nav {
        display: flex;
        gap: 1.25rem;
        align-items: center;
    }

    nav ul {
        display: flex;
        font-size: 1.25rem;
    }

    nav ul li {
        height: var(--header-height);
        padding: 0 0.75rem;
    }

    nav li a {
        margin: calc((var(--header-height) - 1.25rem) / 2) 0;
    }

    nav li:hover,
    nav li:focus-within {
        background: var(--gradient-gray);
        border-radius: 0.5rem;
    }

    .profile-actions {
        position: absolute;
        top: calc(var(--header-height) - 0.5rem);
        right: 1rem;
        list-style: none;
        padding: 0.5rem;
        background: white;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        min-width: 7rem;
        box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
        transition-delay: 200ms;
    }

    .profile-actions li a {
        display: flex;
        gap: 0.5rem;
        color: black;
        text-decoration: none;
        transition: opacity 200ms;
    }
    
    .profile-actions li a:hover {
        opacity: 0.6;
    }
</style>
