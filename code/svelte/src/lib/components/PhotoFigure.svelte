<script>
    import IconButton from '$lib/components/IconButton.svelte';
    import { Heart16, HeartFill16 } from 'svelte-octicons';

    export let photo;

    let liked = false;

    function handleLike() {
        liked = !liked;
        console.log('Like button clicked!');
    }
</script>

<figure>
    <a href="/photo/{photo.PhotoID}" class="round-corners">
        <img src={photo.Image} alt={photo.Alt || "No description provided."} />
    </a>
    <figcaption class="round-corners">
        <span>{photo.Title}</span>
        <section class="actions">
            <IconButton on:click={handleLike} disableBackground hoverable={false}>
                {#if liked}
                <HeartFill16 fill='white' />
                {:else}
                <Heart16 fill='white' />
                {/if}
            </IconButton>
        </section>
    </figcaption>
</figure>

<style>
    figure {
        color: white;
        width: 100%;
        height: fit-content;
        position: relative;
    }

    figure:hover {
        cursor: pointer;
    }

    figure:hover figcaption,
    figure:focus-within figcaption {
        opacity: 1;
    }

    a {
        display: block;
        color: white;
        text-decoration: none;
        overflow: hidden;
    }

    figcaption {
        display: block;
        width: 100%;
        height: 50%;
        background: var(--transparent-black-gradient);
        position: absolute;
        bottom: 0;
        opacity: 0;
        transition: opacity 200ms;
    }

    figcaption {
        position: absolute;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }

    figcaption span {
        padding: 0.5rem;
    }
</style>