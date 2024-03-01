<script>
    import SvelteMarkdown from "svelte-markdown";
    import ProfileBubble from "$lib/components/ProfileBubble.svelte";

    /** @type {import('./$types').LayoutData} */
    export let data;
</script>

<section id="profile-bubbles">
    <ProfileBubble label="Website" href="https://example.com" />
    <ProfileBubble label="Contact" href="mailto:contact@example.com" />
</section>
<section id="user-bio">
    <header>
        <h3>About</h3>
    </header>
    <SvelteMarkdown source={data.bio} />
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
    <ul class="photos-row">
        {#each data.photos as photo}
            <li>
                <img class="round-corners" src="{ photo.Image }" alt="">
            </li>
        {/each}
    </ul>
</section>

<style>
    @import url('/styles/user-profile.css');

    #profile-bubbles {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }

    .photos-row {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 1rem;
    }
</style>