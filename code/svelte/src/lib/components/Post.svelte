<script>
    import UserPortrait from '$lib/components/UserPortrait.svelte';
    import IconButton from '$lib/components/IconButton.svelte';
    import { Heart16, Comment16 } from 'svelte-octicons';

    export let post = {};
    console.log(post);
</script>

<article>
    <header>
        <UserPortrait />
        <h3>{post.creator.DisplayName} <i>uploaded 1 new image</i></h3>
        <p class="username"><i>@{post.creator.Username}</i></p>
    </header>
    <img src={"/api/images/"+post.photo.UUID} alt=""/>
    <footer>
        <h2>{post.photo.Title}</h2>
        <IconButton>
            <Heart16 />
        </IconButton>
        <IconButton>
            <Comment16 />
        </IconButton>
    </footer>
</article>

