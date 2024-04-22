<script>
    import Masonry from "svelte-bricks";
    import PhotoFigure from "$lib/components/PhotoFigure.svelte";

    export let photos;
</script>

{#if photos.length === 0}
    <p>No photos found</p>
{:else if photos.length <= 3}
    <ul class="image-grid">
        {#each photos as photo (photo.PhotoID)}
            <PhotoFigure photo={photo} />
        {/each}
    </ul>
{:else}
    <Masonry items={photos} let:item idKey="PhotoID" minColWidth={200} maxColWidth={"1fr"} gap={8}>
        <PhotoFigure photo={item} />
    </Masonry>
{/if}

<style>
    .image-grid {
        display: flex;
        grid-template-columns: repeat(3, 1fr);
        gap: 0.5rem;
    }
</style>
