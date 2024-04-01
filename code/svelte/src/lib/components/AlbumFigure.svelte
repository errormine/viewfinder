<script>
    export let album;
    export let style = 'default';
</script>

<a href="/album/{album.AlbumID}" class="round-corners">
    <figure class="{style}">
        <img src={"/api/images/"+album.Thumbnail} alt="" />
        <figcaption>
            <span class="font-weight-semi-bold" title={album.Name}>{album.Name}</span>
            <small>{album.Count} Photos</small>
        </figcaption>
    </figure>
</a>

<style>
    a {
        text-decoration: none;
        color: black;
        overflow: hidden;
    }
    
    figure {
        aspect-ratio: 1 / 1;
    }

    figure img {
        height: calc(100% - 3rem);
        object-fit: cover;
    }
    
    figcaption {
        background: var(--color-gray-gradient);
        padding: 0.5rem;
        height: 3rem;
        width: 100%;
    }
    
    figcaption span {
        display: block;
        font-size: 1.2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    /* IF style = minimal FIGCAPTION WILL SHOW ON HOVER*/
    .minimal {
        position: relative;
    }
    
    .minimal img {
        height: 100%;
    }
    
    .minimal figcaption {
        background: var(--transparent-black-gradient);
        color: white;
        position: absolute;
        bottom: 0;
        left: 0;
        height: auto;
    }
    
    .minimal figcaption span {
        font-size: 0.8rem;
    }

    .minimal figcaption small {
        display: none;
    }
</style>
