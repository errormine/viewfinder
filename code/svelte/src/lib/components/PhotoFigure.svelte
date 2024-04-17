<script>
    import IconButton from '$lib/components/IconButton.svelte';
    import { Heart16, HeartFill16 } from 'svelte-octicons';

    export let photo;
    export let fit;
</script>

<a href="/photo/{photo.PhotoID}" class="round-corners">
    <figure>
        <img class={"fit-"+fit} src={"/api/images/"+photo.UUID} alt={photo.Alt || "No description provided."} />
        <figcaption class="round-corners">
            <span>{photo.Title}</span>
        </figcaption>
    </figure>
</a>

<style>
    figure {
        color: white;
        width: 100%;
        height: 100%;
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
        height: 100%;
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

    img {
        height: 100%;
    }
    
    .fit-cover {
        object-fit: cover;
    }
</style>
