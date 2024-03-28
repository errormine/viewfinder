<script>
    import Button from '$lib/components/Button.svelte';

    /** @type {import('./$types').PageData} */
    export let data;
</script>

<main class="content-grid">
    <section class="content">
        <h2>Settings</h2>
        <section class="settings-menu round-corners">
            <section class="settings-left-bar">
                <nav>
                    <ul>
                        <li><a href="/settings#account">Account</a></li>
                        <li><a href="/settings#profile">Profile</a></li>
                        <li><a href="/settings#notifications">Notifications</a></li>
                        <li><a href="/settings#privacy">Privacy</a></li>
                    </ul>
                </nav>
            </section>
            <section class="settings-main">
                <section id="account">
                    <h3>Account</h3>
                    <form action="/api/edit/account" method="POST">
                        <label for="displayName">Display Name</label>
                        <input type="text" id="displayName" name="displayName" value="{data.user.displayName}">

                        <label for="username">Username</label>
                        <input type="text" id="username" name="username" value="{data.user.username}">

                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" value="{data.user.email}">

                        <footer>
                            <Button type="submit" align={'right'}>Save</Button>
                        </footer>
                    </form>
                </section>
                <section id="profile">
                    <h3>Profile</h3>
                    <form action="">
                        <label for="website">Website</label>
                        <input type="text" id="website" name="website" value="{data.user.website}">
                        
                        <label for="location">Location</label>
                        <input type="text" id="location" name="location" value="{data.user.location}">

                        <label for="contact">Contact Email</label>
                        <input type="email" id="contact" name="contact" value="{data.user.email}">

                        <label for="show-buttons">Show buttons on profile</label>
                        <input type="checkbox" id="show-buttons" name="show-buttons" checked="{data.user.showButtons}">

                        <footer>
                            <Button type="submit" align={'right'}>Save</Button>
                        </footer>
                    </form>
                </section>
                <section id="notifications">
                    <h3>Notifications</h3>
                    <form action="">
                        <label for="email-notifications">Email Notifications</label>
                        <input type="checkbox" id="email-notifications" name="email-notifications" checked="{data.user.emailNotifications}">

                        <label for="push-notifications">Push Notifications</label>
                        <input type="checkbox" id="push-notifications" name="push-notifications" checked="{data.user.pushNotifications}">

                        <footer>
                            <Button type="submit" align={'right'}>Save</Button>
                        </footer>
                    </form>
                </section>
                <section id="privacy">
                    <h3>Privacy</h3>
                    <form action="">
                        <label for="private-account">Private Account</label>
                        <input type="checkbox" id="private-account" name="private-account" checked="{data.user.privateAccount}">

                        <footer>
                            <Button type="submit" align={'right'}>Save</Button>
                        </footer>
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

    .settings-menu {
        display: grid;
        grid-template-columns: 1fr 40rem;
        gap: 1rem;
        background-color: white;
        margin-bottom: 2rem;
        border: 1px solid var(--color-gray);
    }

    .settings-left-bar {
        background: var(--color-gray-gradient);
        border-radius: 0.5rem 0 0 0.5rem;
        border-right: 1px solid var(--color-gray);
    }

    .settings-left-bar li {
        display: block;
        padding: 0.75rem;
        padding-right: 1.25rem;
        text-align: right;
        border-bottom: 1px solid var(--color-gray);
    }

    .settings-left-bar a {
        color: black;
        text-decoration: none;
        font-size: 1.5rem;
        font-weight: 600;
    }

    .settings-left-bar nav {
        position: sticky;
        top: var(--header-height);
    }

    .settings-main {
        padding: 1rem 1.5rem;
    }

    .settings-main form {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }

    .settings-main form footer {
        grid-column: span 2;
    }
</style>
