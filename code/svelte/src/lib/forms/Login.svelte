<script>
    import Button from '$lib/components/Button.svelte';

    let dialog;
</script>

<dialog class="login-dialog" bind:this={dialog}>
    <section class="login-wrapper">
        <button class="close-button" on:click={dialog.close()}>X</button>
        <header>
            <h2>Join Website</h2>
        </header>
        <p>Create an account to post photos, comment, and save photos from others.</p>
        <Button href="/auth/google" class="login-button">Log in with Google</Button>
    </section>
</dialog>