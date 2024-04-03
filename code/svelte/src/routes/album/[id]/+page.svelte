<script>
    import PhotoGrid from '$lib/components/PhotoGrid.svelte';

    /** @type {import('./$types').PageData} */
    export let data;
</script>

<main class="content-grid">
    <section class="album">
        <header class="album-info round-corners margin-bottom-1">
            <h1>{data.album.Name}</h1>
            <p>{data.album.Description}</p>
        </header>
        <section class="photos">
            <PhotoGrid photos={data.photos} />
        </section>
    </section>
</main>

<style>
    .album {
        background: white;
        padding: 1rem;
    }

    .album-info {
        background: var(--color-light-gray);
        padding: 2rem;
        text-align: center;
    }
</style>
