<script>
    import { page } from '$app/stores';
    /** @type {import('./$types').LayoutData} */
    export let data;

    export let baseHref = `/user/${ data.username }`;
    export let photosHref = `${baseHref}/photos`;
    export let albumsHref = `${baseHref}/albums`;
    export let favoritesHref = `${baseHref}/favorites`;
</script>

<main class="content-grid">
    <header class='hero full-width'>
        <section class='user-info'>
            <figure class='user-portrait'>
                <img src="https://picsum.photos/200" alt="">
                <figcaption>
                    <h2 class='user-display-name'>{ data.displayName }</h2>
                    <p class="user-handle font-weight-light">@{ data.username }</p>
                </figcaption>
            </figure>
            <ul class='user-stats'>
                <li><span>{ data.photosCount }</span> Photos</li>
                <li><span>{ data.followersCount }</span> Followers</li>
                <li><span>{ data.followingCount }</span> Following</li>
            </ul>
        </section>
    </header>
    <nav class='profile-navigation full-width'>
        <ul>
            <li class:active={ $page.url.pathname === baseHref }>
                <a href={ baseHref } >About</a>
            </li>
            <li class:active={ $page.url.pathname.includes(photosHref) }>
                <a href={ photosHref }>Photos</a>
            </li>
            <li class:active={ $page.url.pathname.includes(albumsHref) }>
                <a href={ albumsHref }>Albums</a>
            </li>
            <li class:active={ $page.url.pathname.includes(favoritesHref) }>
                <a href={ favoritesHref }>Favorites</a>
            </li>
        </ul>
    </nav>
    <section class="page-contents">
        <slot />
    </section>
</main>

<style>
    :global(body) {
        padding: 0;
    }

    /* USER PROFILE HEADER */
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
        text-shadow: black 1px 0px 4px;
    }

    .user-stats span {
        font-weight: 600;
    }

    /* PROFILE NAVIGATION */
    .profile-navigation {
        background: var(--color-light-gray);
        font-size: 1.6rem;
        height: fit-content;
    }

    .profile-navigation ul {
        display: flex;
        flex-direction: row;
    }
    
    .profile-navigation ul li {
        display: block;
        padding: 0 1.5rem;
        height: 100%;
    }
    
    .profile-navigation li.active {
        background: white;
        border-radius: 0.5rem 0.5rem 0 0;
    }
    
    .profile-navigation a {
        display: block;
        text-decoration: none;
        color: var(--color-dark-gray);
        margin: 0.5rem 0;
    }

    .profile-navigation li.active a {
        color: black;
    }

    .page-contents {
        padding: 1.5rem 4rem;
        background: white;
    }
</style>