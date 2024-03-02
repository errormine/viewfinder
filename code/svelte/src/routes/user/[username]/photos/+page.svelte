<script>
    import PhotoFigure from "$lib/components/PhotoFigure.svelte";

    /** @type {import('./$types').PageData} */
    export let data;
</script>

<section id="photo-gallery">
    <header>
        <h3>Photo Gallery</h3>
    </header>
    {#each data.photos as photo}
        <PhotoFigure src={photo.Image} />
    {/each}
</section>