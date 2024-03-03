<script>
    import AlbumFigure from "$lib/components/AlbumFigure.svelte";

    export let albums;
</script>

<section class="album-grid">
    {#each albums as album}
        <AlbumFigure {album} />
    {/each}
</section>

<style>
    .album-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 0.5rem;
    }
</style>