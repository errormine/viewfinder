<script>
    import ProfileBubble from "$lib/components/ProfileBubble.svelte";

    /** @type {import('./$types').LayoutData} */
    export let data;
</script>

<section id="profile-bubbles">
    <ProfileBubble label="Website" href="https://example.com" />
    <ProfileBubble label="Contact" href="mailto:contact@example.com" />
</section>
<section id="user-bio">
    <p>Here is the user bio I guess</p>
</section>
<section id="user-showcase" >
    <header>
        <h3>Showcase</h3>
    </header>
    <p>Here is the user showcase</p>
</section>
<section id="user-recent-photos">
    <header>
        <h3>Recent Photos</h3>
        <a href="/user/{ data.username }/photos">View more</a>
    </header>
    <p>Here are the user's recent photos</p>
</section>

<style>
    @import url('/styles/user-profile.css');

    #profile-bubbles {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }
</style>