<script>
    import { Heart16 } from 'svelte-octicons';

    export let photo;
</script>

<a href="/user/john_doe/photos/1098234">
    <figure class="round-corners">
        <img src={photo.Image} alt={photo.Alt || "No alt text provided."} />
        <figcaption>
            <section>
                <p>{photo.Title}</p>
                <Heart16 fill='white' />
            </section>
        </figcaption>
    </figure>
</a>

<style>
    a {
        display: block;
        width: 100%;
    }

    figure {
        width: 100%;
        overflow: hidden;
        position: relative;
    }

    figure:hover {
        cursor: pointer;
    }

    figcaption {
        display: block;
        width: 100%;
        height: 100%;
        background: var(--transparent-black-gradient);
        color: white;
        position: absolute;
        bottom: 0;
        opacity: 0;
        transition: opacity 200ms;
    }

    figure:hover figcaption {
        opacity: 1;
    }
</style>