<script>
    import AlbumGrid from '$lib/components/AlbumGrid.svelte';
    import IconButton from '$lib/components/IconButton.svelte';
    import { SortAsc16, SortDesc16 } from 'svelte-octicons';

    /** @type {import('./$types').PageData} */
    export let data;
</script>

<svelte:head>
    <title>{data.displayName}'s albums</title>
</svelte:head>
<section id="album-gallery">
    <header>
        <h3>Albums</h3>
        <IconButton title="Sort: Newest" disableBackground>
            <SortDesc16 />
        </IconButton>
    </header>
    <AlbumGrid albums={data.albums} />
</section>
