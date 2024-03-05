<script>
    import ActionBar from '$lib/components/ActionBar.svelte';
    import IconButton from '$lib/components/IconButton.svelte';
	import UserPortrait from '$lib/components/UserPortrait.svelte';
    import { Download24, SortDesc16 } from 'svelte-octicons';

    /** @type {import('./$types').PageData} */
    export let data;
</script>

<main class="content-grid">
    <section class="image-viewer full-width">
        <img src={data.photo.Image} alt="">
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
                <UserPortrait size={48} />
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
                <p>No comments yet</p>
            </section>
        </section>
        <section class="image-metadata">
            <section class="metadata-metrics">
                <p>Likes: {data.photo.Likes}</p>
                <p>Views: {data.photo.Views}</p>
            </section>
            <section></section>
        </section>
    </section>
</main>

<style>
    .image-viewer {
        background: var(--color-black-gradient);
        height: 28rem;
    }

    .image-viewer {
        display: grid;
    }
    
    .image-viewer img {
        width: auto;
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
        grid-template-columns: 67% 1fr;
        gap: 1rem;
    }

    .image-details {
        padding: 1rem;
    }

    .image-details header {
        display: flex;
        align-items: center;
    }

    .image-details header h1 {
        margin: 0;
    }

    .image-description {
        margin: 1rem 0;
        padding: 1rem;
        background-color: var(--color-light-gray);
    }
</style>