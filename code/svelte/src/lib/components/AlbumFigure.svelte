<script>
    export let album;
</script>

<figure class="round-corners">
    <img src={album.Thumbnail} alt="" />
    <figcaption>
        <a href="/" class="font-weight-semi-bold" title={album.Name}>{album.Name}</a>
        <small>{album.Count} Photos</small>
    </figcaption>
</figure>

<style>
    @import url('/styles/user-profile.css');

    figure {
        overflow: hidden;
    }
    
    figcaption {
        background: var(--color-gray-gradient);
        padding: 0.5rem;
        height: 3rem;
    }
    
    figcaption a {
        display: block;
        text-decoration: none;
        color: black;
        font-size: 1.2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    </style>