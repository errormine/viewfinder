<script>
    import TimeAgo from 'javascript-time-ago';
    import en from 'javascript-time-ago/locale/en';
    import UserPortrait from '$lib/components/UserPortrait.svelte';
    import IconButton from '$lib/components/IconButton.svelte';
    import { KebabHorizontal16 } from 'svelte-octicons';

    export let comment;
    
    TimeAgo.addDefaultLocale(en);
    const timeAgo = new TimeAgo('en-US');
</script>

<article class="comment">
    <section>
        <UserPortrait username={comment.creator.Username} src={comment.creator.ProfilePicture} size={3} />
    </section>
    <section class="content">
        <header>
            <h3><a href={"/user/"+comment.creator.Username}>@{comment.creator.Username}</a></h3>
            <p>{timeAgo.format(new Date(comment.Timestamp))}</p>
        </header>
        <p>{comment.Content}</p>
    </section>
    <section class="actions">
        <IconButton shape="circle" disableBackground>
            <KebabHorizontal16 />
        </IconButton>
    </section>
</article>

<style>
    .comment {
        display: grid;
        grid-template-columns: 3rem 1fr 2rem;
        gap: 0.5rem;
    }

    .comment .actions {
        opacity: 0;
        transition: 200ms;
    }

    .comment:hover .actions {
        opacity: 1;
    }

    .comment header {
        display: flex;
        align-items: baseline;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
    }

    .comment header h3 {
        font-size: 1rem;
        margin: 0;
    }

    .comment header p {
        font-size: 0.8rem;
    }

    .comment header a {
        color: black;
        text-decoration: none;
    }

    .comment header a:hover {
        text-decoration: underline;
    }

    .comment .content p {
        white-space: pre-wrap;
        margin: 0;
    }

    .comment .content {
        padding: 0.25rem 0.5rem;
    }
</style>
