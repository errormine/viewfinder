<script>
    import PhotoGrid from '$lib/components/PhotoGrid.svelte';

    /** @type {import('./$types').PageData} */
    export let data;
</script>

<svelte:head>
    <title>{data.query} - Viewfinder</title>
</svelte:head>
<main class="content-grid">
    <section>
        <h2>Search</h2>
        <PhotoGrid photos={data.results} />
    </section>
</main>
