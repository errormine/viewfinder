<script>
    import PhotoGrid from '$lib/components/PhotoGrid.svelte';

    /** @type {import('./$types').PageData} */
    export let data;
</script>

<section id="photo-gallery">
    <header>
        <h3>Photo Gallery</h3>
    </header>
    <PhotoGrid photos={data.photos} />
</section>