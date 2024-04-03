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
    </section>
</main>

<style>
    .explore-page {
        padding: 1.5rem;
    }
</style>
