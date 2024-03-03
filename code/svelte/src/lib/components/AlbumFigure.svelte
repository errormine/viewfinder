<script>
    export let album;
</script>

<a href="/album/{album.AlbumID}" class="round-corners">
    <figure>
        <img src={album.Thumbnail} alt="" />
        <figcaption>
            <span class="font-weight-semi-bold" title={album.Name}>{album.Name}</span>
            <small>{album.Count} Photos</small>
        </figcaption>
    </figure>
</a>

<style>
    @import url('/styles/user-profile.css');

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
    }
    
    figcaption span {
        display: block;
        font-size: 1.2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    </style>