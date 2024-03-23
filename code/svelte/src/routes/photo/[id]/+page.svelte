<script>
    import ActionBar from '$lib/components/ActionBar.svelte';
    import Button from '$lib/components/Button.svelte';
    import IconButton from '$lib/components/IconButton.svelte';
	import UserPortrait from '$lib/components/UserPortrait.svelte';
    import AlbumGrid from '$lib/components/AlbumGrid.svelte';
    import { Download24, Heart24, SortDesc16 } from 'svelte-octicons';

    /** @type {import('./$types').PageData} */
    export let data;

    console.log(data);
</script>

<main class="content-grid">
    <section class="image-viewer full-width">
        <img src="/api/images/{data.photo.UUID}" alt="">
        <section class="aside-right">
            <ActionBar>
                <IconButton disableBackground hoverable={false}>
                    <Download24 fill={"white"}/>
                </IconButton>
            </ActionBar>
        </section>
    </section>
    <section class="image-info">
        <section class="image-details">
            <header>
                <UserPortrait username={data.creator.username} src={data.creator.picture} size={3} />
                <h1>{data.photo.Title}</h1>
            </header>
            <p class="image-description round-corners">{data.photo.Description}</p>
            <section class="image-comments">
                <header class="flex space-between margin-bottom-1">
                    <h2 class="margin-0">0 Comments</h2>
                    <IconButton disableBackground>
                        <SortDesc16 />
                    </IconButton>
                </header>
                <section class="comment-box">
                    <section>
                    {#if data.loggedIn }
                        <UserPortrait username={data.user.username} src={data.user.picture} size={2} />
                    {:else}
                        <UserPortrait size={2} />
                    {/if}
                    </section>
                    <textarea class="round-corners inset-bg" name="comment-box" id="comment-box" rows="3" placeholder="Add a comment..."></textarea>
                    <section class="comment-box-bottom">
                        <Button align={"right"}>Post</Button>
                    </section>
                </section>
            </section>
        </section>
        <section class="image-metadata">
            <section class="metadata-metrics flex wrap space-between margin-bottom-1">
                <section class="round-corners">
                    <h3>Favorites</h3>
                    <p>0</p>
                </section>
                <section class="round-corners">
                    <h3>Downloads</h3>
                    <p>0</p>
                </section>
                <section class="round-corners">
                    <h3>Uploaded</h3>
                    <p>{new Date(data.photo.Timestamp).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </section>
            </section>
            {#if data.linkedAlbums != null && data.linkedAlbums.length > 0}
                <section class="metadata-albums margin-bottom-1">
                    <h3>This photo is part of {data.linkedAlbums.length} albums</h3>
                    <AlbumGrid albums={data.linkedAlbums} size={'small'} />
                </section>
            {/if}
            <section class="metadata-tags margin-bottom-1">
                <h3>Tags</h3>
                <p>No tags</p>
            </section>
        </section>
    </section>
</main>

<style>
    .image-viewer {
        background: var(--color-black-gradient);
        min-height: 24rem;
        max-height: 32rem;
    }

    .image-viewer {
        display: grid;
    }
    
    .image-viewer img {
        width: auto;
        max-width: 100%;
        max-height: 100%;
        margin: auto;
    }

    .aside-right {
        position: relative;
    }

    :global(.aside-right > *) {
        position: absolute;
        left: 0.5rem;
        bottom: 0.5rem;
    }

    .image-info {
        background: white;
        display: grid;
        grid-template-columns: 65% 1fr;
        gap: 1rem;
        padding: 1rem;
    }

    .image-details header {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .image-details header h1 {
        margin: 0;
    }

    .image-description {
        margin: 1rem 0;
        padding: 1rem;
        background-color: var(--color-light-gray);
    }

    .comment-box {
        display: grid;
        grid-template-columns: 2rem 1fr;
        gap: 1rem;
    }

    .comment-box-bottom {
        grid-column: span 2;
    }

    .metadata-metrics {
        gap: 1rem;
    }
    
    .metadata-metrics > * {
        padding: 0.5rem;
        flex-grow: 1;
    }

    .metadata-metrics * {
        background-color: var(--color-light-gray);
        margin: 0;
    }

    .metadata-metrics h3 {
        font-size: 1.2rem;
        margin-bottom: 0.25rem;
    }
</style>
