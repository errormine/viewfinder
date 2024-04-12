<script>
    import DOMPurify from "isomorphic-dompurify";
    import * as gemtext from "dioscuri";
    import { Pencil16, X16 } from "svelte-octicons";

    import ProfileBubble from "$lib/components/ProfileBubble.svelte";
    import ActionBar from "$lib/components/ActionBar.svelte";
    import Button from "$lib/components/Button.svelte";
    import IconButton from "$lib/components/IconButton.svelte";
    import PhotoFigure from "$lib/components/PhotoFigure.svelte";

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
    {#if data.website }
        <ProfileBubble label="Website" href={data.website} />
    {/if}
    {#if data.contact }
        <ProfileBubble label="Contact" href={"mailto:"+data.contact} />
    {/if}
    {#if data.location }
        <ProfileBubble label="Location" text={data.location}/>
    {/if}
    {#if data.joinDate }
        <ProfileBubble label="Joined" text={new Date(data.joinDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}/>
    {/if}
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
                <IconButton title="Edit Bio" on:click={() => editingBio = true } disableBackground>
                    <Pencil16 />
                </IconButton>
            {/if}
        </ActionBar>
    </header>
    {#if editingBio}
        <textarea bind:this={bioInput} id="bio-input" rows="5" class="round-corners inset-bg">{data.bio}</textarea>
    {:else}
        {@html DOMPurify.sanitize(gemtext.buffer(data.bio)) }
    {/if}
</section>
<section id="user-showcase" >
    <header>
        <h3>Showcase</h3>
        <IconButton title="Edit Showcase" disableBackground>
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
        {#each data.recentPhotos as photo}
            <li>
                <PhotoFigure {photo} fit={'cover'}/>
            </li>
        {/each}
    </ul>
</section>

<style>
    #profile-bubbles {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin-bottom: 1rem;
        justify-content: space-evenly;
    }

    :global(#profile-bubbles > *) {
        flex-grow: 1;
    }

    .photos-row {
        display: flex; 
        justify-content: space-evenly;
        align-items: stretch;
        gap: 0.5rem;
    }
</style>
