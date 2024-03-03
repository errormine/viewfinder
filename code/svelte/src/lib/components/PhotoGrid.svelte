<script>
    import Masonry from "svelte-bricks";
    import PhotoFigure from "$lib/components/PhotoFigure.svelte";

    export let photos;
</script>

<Masonry items={photos} let:item idKey="PhotoID" minColWidth={200} maxColWidth={"1fr"} gap={8}>
    <PhotoFigure photo={item} />
</Masonry>