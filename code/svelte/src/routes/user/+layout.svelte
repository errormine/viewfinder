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
<nav class='profile-navigation full-width'>
    <ul>
        <li class="active"><a href="/user/[username]" >About</a></li>
        <li><a href="/user/[username]/photos">Photos</a></li>
        <li><a href="/user/[username]/albums">Albums</a></li>
        <li><a href="/user/[username]/favorites">Favorites</a></li>
    </ul>
</nav>
<slot />

<style>
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
</style>