<script>
    import { page } from '$app/stores';
    import { Gear16, Person16, SignOut16, Upload16 } from 'svelte-octicons';
    import SearchBar from '$lib/components/SearchBar.svelte';
    import ActionBar from '$lib/components/ActionBar.svelte';
    import Button from '$lib/components/Button.svelte';
    import IconButton from '$lib/components/IconButton.svelte';
    import UserPortrait from '$lib/components/UserPortrait.svelte';

    let dialog;
</script>

<dialog class="login-dialog" bind:this={dialog}>
    <section class="login-wrapper">
        <button class="close-button" on:click={dialog.close()}>X</button>
        <h2>Join Website</h2>
        <p>Create an account to post photos, comment, and save photos from others.</p>
        <Button href={"/auth/google"}>Log in with Google</Button>
    </section>
</dialog>
<header>
    <h1><a href="/">Website</a></h1>
    <SearchBar />
    {#if $page.data.loggedIn}
        <ActionBar>
            <IconButton href="/upload" shape={"circle"}>
                <Upload16 title={"Upload"}/>
            </IconButton>
            <UserPortrait username={$page.data.user.username} src={$page.data.user.picture} size={2} color={"gray"}/>
            <ul class="profile-actions round-corners">
                <li>
                    <a href="/profile"><Person16 /> Profile</a>
                </li>
                <hr />
                <li>
                    <a href="/settings"><Gear16 /> Settings</a>
                </li>
                <hr />
                <li>
                    <a href="/auth/logout"><SignOut16 /> Log Out</a>
                </li>
            </ul>
        </ActionBar>
    {:else}
        <Button on:click={dialog.showModal()} align={"right"}>Log In</Button>
    {/if}
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

    header h1 a {
        display: block;
        text-decoration: none;
        color: black;
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
