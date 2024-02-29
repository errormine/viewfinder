<script>
    /** @type {import('./$types').PageData} */
    export let data;

    console.log(data.photos);
</script>

<h2>Photo Gallery</h2>

{#each data.photos as photo}
    <a href={ photo.Image }>
        <img src={ photo.Image } alt="" />
    </a>
{/each}