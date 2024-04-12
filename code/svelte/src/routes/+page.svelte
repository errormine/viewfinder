<script>
    /** @type {import('./$types').LayoutData} */
    export let data;
</script>

<main style={"background: url(/api/images/"+data.featuredImage.photo.UUID+") no-repeat center / cover;"}>
    <section>
        <h2><a href={"/photo/"+data.featuredImage.photo.PhotoID}>{data.featuredImage.photo.Title}</a></h2>
        <p>by <a href={"/user/"+data.featuredImage.creator.Username}>{data.featuredImage.creator.DisplayName}</a></p>
    </section>
</main>

<style>
    main {
        background-size: cover;
        position: relative;
        height: 100%;
    }

    section {
        display: block;
        position: absolute;
        bottom: 0;
        width: 100%;
        text-align: center;
        color: white;
        text-shadow: black 1px 0px 8px;
    }

    section a {
        color: white;
        text-decoration: none;
    }

    section a:hover {
        text-decoration: underline;
    }
</style>
