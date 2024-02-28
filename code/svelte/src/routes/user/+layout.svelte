<header class='hero full-width'>
    <section class='user-info'>
        <figure class='user-portrait'>
            <img src="https://picsum.photos/200" alt="">
            <figcaption>
                <h2 class='user-display-name'>British Library</h2>
                <p class="user-handle font-weight-light">@thebritishlibrary</p>
            </figcaption>
        </figure>
        <ul class='user-stats'>
            <li><span>1.5K</span> Photos</li>
            <li><span>60.5K</span> Followers</li>
            <li><span>30</span> Following</li>
        </ul>
    </section>
</header>
<main class="content-grid">
    <nav class='profile-navigation full-width'>
        <ul>
            <li><a href="/user/[username]">About</a></li>
            <li><a href="/user/[username]/photos">Photos</a></li>
            <li><a href="/user/[username]/albums">Albums</a></li>
            <li><a href="/user/[username]/favorites">Favorites</a></li>
        </ul>
    </nav>
    <slot />
</main>

<style>
    :global(main), .content-grid, .full-width {
        display: grid;
        grid-template-columns: [full-width-start] 1fr [content-start] minmax(0, 50rem) [content-end] 1fr [full-width-end];
    }

    .content-grid > *,
    .full-width > * {
        grid-column: content;
    }

    .content-grid > .full-width {
        grid-column: full-width;
    }

    .hero {
        color: white;
        background: var(--transparent-black-gradient), url(https://picsum.photos/1920/1080) no-repeat center;
        background-size: cover;
        position: relative;
        height: 20rem;
    }
    
    .user-info {
        width: 100%;
        position: absolute;
        bottom: 1.2rem;
    }
    
    .user-portrait {
        display: block;
        gap: 1.5rem;
    }

    .user-portrait img {
        float: left;
        border-radius: 50%;
        width: 7rem;
        height: 7rem;
        border: 2px white solid;
        margin-right: 1.5rem;
    }

    .user-portrait figcaption {
        display: inline-block;
        position: relative;
        top: 1.25rem;
    }

    .user-display-name {
        font-size: 2.75rem;
        font-weight: 400;
        margin: 0;
    }

    .user-handle {
        margin: 0;
    }

    .user-stats {
        float: right;
        position: relative;
        bottom: 1.5rem;
        display: flex;
        gap: 0.25rem;
        flex-direction: column;
        text-align: right;
        font-weight: 300;
    }

    .user-stats span {
        font-weight: 600;
    }

    .profile-navigation {
        height: 3rem;
    }

    .profile-navigation ul li {
        display: inline;
        margin-right: 1rem;
    }
</style>