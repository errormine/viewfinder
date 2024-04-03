<script>
    import PhotoGrid from '$lib/components/PhotoGrid.svelte';
    import IconButton from '$lib/components/IconButton.svelte';
    import { SortDesc16 } from 'svelte-octicons';

    /** @type {import('./$types').PageData} */
    export let data;
</script>

<main>
    <section class="explore-page">
        <header class="flex space-between">
            <h2>Explore</h2>
            <IconButton disableBackground>
                <SortDesc16 title="Sort" />
            </IconButton>
        </header>
        {#if data.photos.length == 0}
            <p>Explore photos from other users.</p>
        {:else}
            <PhotoGrid photos={data.photos} />
        {/if}
        <footer>
            {#if data.page > 0}
                <p><a href="/explore?page={data.page - 1}">Previous page</a></p>
            {/if}
            <p class="next-page"><a href="/explore?page={data.page + 1}">Next page</a></p>
        </footer>
    </section>
</main>

<style>
    .explore-page {
        padding: 1.5rem;
    }

    footer {
        margin-top: 1rem;
    }

    footer p {
        margin: 0;
    }

    .next-page {
        text-align: right;
    }
</style>
