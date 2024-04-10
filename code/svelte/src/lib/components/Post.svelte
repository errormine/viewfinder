<script>
    import UserPortrait from '$lib/components/UserPortrait.svelte';
    import IconButton from '$lib/components/IconButton.svelte';
    import { Heart16, Comment16 } from 'svelte-octicons';

    export let post = {};

    let userLink = "/user/"+post.creator.Username;
</script>

<article class="post round-corners ">
    <header class="flex gap-05 align-center">
        <UserPortrait username={post.creator.Username} src={post.creator.ProfilePicture}/>
        <section>
            <h3><a href={userLink}>{post.creator.DisplayName}</a> <i>uploaded 1 new image</i></h3>
            <p class="username"><i><a href={userLink}>@{post.creator.Username}</a></i></p>
        </section>
    </header>
    <a href="{"/photo/"+post.photo.PhotoID}">
        <img src={"/api/images/"+post.photo.UUID} alt=""/>
    </a>
    <footer class="flex space-between align-center">
        <h2>{post.photo.Title}</h2>
        <section class="flex">
            <IconButton disableBackground>
                <Heart16 />
            </IconButton>
            <IconButton disableBackground>
                <Comment16 />
            </IconButton>
        </section>
    </footer>
</article>

<style>
    .post {
        max-width: 26rem;
        overflow: hidden;
        box-shadow: var(--bold-shadow);
    }
    
    .post > header,
    .post > footer {
        padding: 1rem;
        background: var(--gradient-white);
    }

    .post h3 {
        font-size: 1rem;
        margin-bottom: 0;
    }

    .post h3 i {
        font-weight: 400;
    }

    .post > header a {
        color: black;
        text-decoration: none;
    }

    .post > header p,
    .post > header p a {
        font-size: 0.8rem;
        color: var(--color-dark-gray);
        margin-bottom: 0;
    }
    
    .post img {
        max-height: 60vh;
        object-fit: cover;
    }

    .post > footer h2 {
        margin-bottom: 0;
    }

</style>
