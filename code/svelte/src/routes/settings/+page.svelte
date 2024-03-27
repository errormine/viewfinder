<script>
    import Button from '$lib/components/Button.svelte';

    /** @type {import('./$types').PageData} */
    export let data;
</script>

<main class="content-grid">
    <section class="content">
        <h2>Settings</h2>
        <section class="settings-meu">
            <nav>
                <ul>
                    <li><a href="/settings#account">Account</a></li>
                    <li><a href="/settings#profile">Profile</a></li>
                    <li><a href="/settings#notifications">Notifications</a></li>
                    <li><a href="/settings#privacy">Privacy</a></li>
                </ul>
            </nav>
            <section class="settings-main">
                <section id="account">
                    <h3>Account</h3>
                    <form action="">
                        <label for="display-name">Display Name</label>
                        <input type="text" id="display-name" name="display-name" value="{data.user.displayName}">

                        <label for="username">Username</label>
                        <input type="text" id="username" name="username" value="{data.user.username}">

                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" value="{data.user.email}">

                        <Button>Save</Button>
                    </form>
                </section>
                <section id="profile">
                    <h3>Profile</h3>
                    <form action="">
                        <label for="website">Website</label>
                        <input type="url" id="website" name="website" value="{data.user.website}">
                        
                        <label for="location">Location</label>
                        <input type="text" id="location" name="location" value="{data.user.location}">

                        <label for="contact">Contact Email</label>
                        <input type="email" id="contact" name="contact" value="{data.user.email}">

                        <label for="show-buttons">Show buttons on profile</label>
                        <input type="checkbox" id="show-buttons" name="show-buttons" checked="{data.user.showButtons}">

                        <Button>Save</Button>
                    </form>
                </section>
                <section id="notifications">
                    <h3>Notifications</h3>
                    <form action="">
                        <label for="email-notifications">Email Notifications</label>
                        <input type="checkbox" id="email-notifications" name="email-notifications" checked="{data.user.emailNotifications}">

                        <label for="push-notifications">Push Notifications</label>
                        <input type="checkbox" id="push-notifications" name="push-notifications" checked="{data.user.pushNotifications}">

                        <Button>Save</Button>
                    </form>
                </section>
                <section id="privacy">
                    <h3>Privacy</h3>
                    <form action="">
                        <label for="private-account">Private Account</label>
                        <input type="checkbox" id="private-account" name="private-account" checked="{data.user.privateAccount}">

                        <Button>Save</Button>
                    </form>
                </section>
            </section>
        </section>
    </section>
</main>

<style>
    .content {
        margin-top: 2rem;
    }
</style>
