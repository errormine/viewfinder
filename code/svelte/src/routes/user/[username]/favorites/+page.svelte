<script>
    import PhotoGrid from '$lib/components/PhotoGrid.svelte';
    import IconButton from '$lib/components/IconButton.svelte';
	import { SortAsc16, SortDesc16 } from 'svelte-octicons';

    /** @type {import('./$types').PageData} */
    export let data;
</script>

<svelte:head>
    <title>{data.displayName}'s favorites</title>
</svelte:head>
<section id="user-favorites">
    <header>
        <h3>Favorites</h3>
        <IconButton title="Sort: Newest" disableBackground>
            <SortDesc16 />
        </IconButton>
    </header>
    {#if data.favorites.length > 0}
        <PhotoGrid photos={data.favorites} />
    {:else}
        <p>No photos found.</p>
    {/if}
</section>
