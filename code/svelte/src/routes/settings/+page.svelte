<script>
    import Button from '$lib/components/Button.svelte';
    import Switch from '$lib/components/Switch.svelte';
    /** @type {import('./$types').PageData} */
    export let data;

    console.log(data);

    let accountForm;
    let profileForm;

    function saveChanges(form) {
        return async (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                alert('Changes saved');
            } else {
                alert('Failed to save changes');
            }
        };
    }
</script>

<svelte:head>
    <title>Settings</title>
</svelte:head>
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
                    <form action="/api/edit/account" method="POST" bind:this={accountForm}>
                        <label for="displayName">Display Name</label>
                        <input type="text" id="displayName" name="displayName" value="{data.user.displayName}">

                        <label for="username">Username</label>
                        <input type="text" id="username" name="username" value="{data.user.username}">

                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" value="{data.user.email}">

                        <footer>
                            <Button type="submit" align={'right'} on:click={saveChanges(accountForm)}>Save</Button>
                        </footer>
                    </form>
                </section>
                <section id="profile">
                    <h3>Profile</h3>
                    <form action="/api/edit/profile" bind:this={profileForm}>
                        <label for="website">Website</label>
                        <input type="text" id="website" name="website" value="{data.user.website}" placeholder="example.com">
                        
                        <label for="location">Location</label>
                        <input type="text" id="location" name="location" value="{data.user.location}" placeholder="Nowhere, USA">

                        <label for="contact">Contact Email</label>
                        <input type="email" id="contact" name="contact" value="{data.user.contact}" placeholder="user@example.com">

                        <label for="show-buttons">Show buttons on profile</label>
                        <Switch id ="show-buttons" name="show-buttons"/>

                        <footer>
                            <Button type="submit" align={'right'} on:click={saveChanges(profileForm)}>Save</Button>
                        </footer>
                    </form>
                </section>
                <section id="notifications">
                    <h3>Notifications</h3>
                    <form action="">
                        <label for="email-notifications">Email Notifications</label>
                        <Switch id ="email-notifications" name="email-notifications"/>

                        <label for="push-notifications">Push Notifications</label>
                        <Switch id ="push-notifications" name="push-notifications"/>

                        <footer>
                            <Button type="submit" align={'right'}>Save</Button>
                        </footer>
                    </form>
                </section>
                <section id="privacy">
                    <h3>Privacy</h3>
                    <form action="">
                        <label for="private-account">Private Account</label>
                        <Switch id ="private-account" name="private-account"/>

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
        background: var(--gradient-gray);
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

    .settings-main form label,
    .settings-main form input {
        margin-bottom: 0;
    }

    .settings-main form footer {
        grid-column: span 2;
    }
</style>
