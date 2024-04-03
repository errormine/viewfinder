<script>
    import AlbumFigure from "$lib/components/AlbumFigure.svelte";

    export let albums;
    export let size = 'large';
</script>

<section class="album-grid {size}">
    {#each albums as album}
        <AlbumFigure {album} style={size == 'large' ? 'default' : 'minimal' } />
    {/each}
</section>

<style>
    .album-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
        gap: 0.5rem;
    }

    .album-grid.small {
        grid-template-columns: repeat(auto-fill, minmax(5rem, 1fr));
    }
</style>
