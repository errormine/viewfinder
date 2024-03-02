<script>
    import DOMPurify from "isomorphic-dompurify";
    import * as gemtext from "dioscuri";
    import { Pencil16, X16 } from "svelte-octicons";

    import ProfileBubble from "$lib/components/ProfileBubble.svelte";
    import ActionBar from "$lib/components/ActionBar.svelte";
    import Button from "$lib/components/Button.svelte";
    import IconButton from "$lib/components/IconButton.svelte";

    /** @type {import('./$types').LayoutData} */
    export let data;

    let bioInput;
    let editingBio = false;
    let showcaseContents;

    function handleSaveBio() {
        editingBio = false;
        data.bio = bioInput.value;

        fetch('/edit/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ bio: bioInput.value })
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.error(error);
            data.bio = 'Error saving bio.';
        });
    }
</script>

<section id="profile-bubbles">
    <ProfileBubble label="Website" href="https://example.com" />
    <ProfileBubble label="Contact" href="mailto:contact@example.com" />
</section>
<section id="user-bio">
    <header>
        <h3>About</h3>
        <ActionBar>
            {#if editingBio}
                <Button on:click={handleSaveBio}>Save</Button>
                <IconButton title="Cancel" on:click={() => editingBio = false }>
                    <X16 />
                </IconButton>
            {:else}
                <IconButton title="Edit Bio" on:click={() => editingBio = true } noBG>
                    <Pencil16 />
                </IconButton>
            {/if}
        </ActionBar>
    </header>
    {#if editingBio}
        <textarea bind:this={bioInput} id="bio-input" rows="5" class="rounded-corners">{data.bio}</textarea>
    {:else}
        {@html DOMPurify.sanitize(gemtext.buffer(data.bio)) }
    {/if}
</section>
<section id="user-showcase" >
    <header>
        <h3>Showcase</h3>
        <IconButton title="Edit Showcase" noBG>
            <Pencil16 />
        </IconButton>
    </header>
    <article bind:this={showcaseContents}>
        <p>Here is the user showcase</p>
    </article>
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