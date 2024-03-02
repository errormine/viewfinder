<script>
    import PhotoFigure from "$lib/components/PhotoFigure.svelte";

    export let photos;
</script>

<section class="photo-grid">
    {#each photos as photo}
        <PhotoFigure src={photo.Image} />
    {/each}
</section>

<style>
    .photo-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 0.5rem;
    }
</style>