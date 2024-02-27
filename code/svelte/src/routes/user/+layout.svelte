<main class="content-grid">
    <header class='hero full-width'>
        <img src="https://picsum.photos/200" alt="">
        <h2>British Library</h2>
        <p class="tagline">@thebritishlibrary</p>
        <ul>
            <li>
                <p><span>1.5K</span> Photos</p>
            </li>
            <li>
                <p><span>60.5K</span> Followers</p>
            </li>
            <li>
                <p><span>30</span> Following</p>
            </li>
        </ul>
    </header>
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
        grid-template-columns: [full-width-start] 1fr [content-start] minmax(0, 64rem) [content-end] 1fr [full-width-end];
    }

    .content-grid > *,
    .full-width > * {
        grid-column: content;
    }

    .content-grid > .full-width {
        grid-column: full-width;
    }

    .hero {
        background: url(https://picsum.photos/1920/1080) no-repeat center;
        background-size: cover;
        position: relative;
        max-height: 20rem;
    }

    .profile-navigation {
        height: 3rem;
    }

    .profile-navigation ul li {
        display: inline;
        margin-right: 1rem;
    }
</style>