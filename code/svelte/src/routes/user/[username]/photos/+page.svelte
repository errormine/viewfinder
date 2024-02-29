<script>
    /** @type {import('./$types').PageData} */
    export let data;

    console.log(data.photos);
</script>

<section id="photo-gallery">
    <header>
        <h3>Photo Gallery</h3>
    </header>
    {#each data.photos as photo}
        <a href={ photo.Image }>
            <img src={ photo.Image } alt="" />
        </a>
    {/each}
</section>