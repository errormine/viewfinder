<script>
    import ago from 's-ago';
    import UserPortrait from '$lib/components/UserPortrait.svelte';
    import IconButton from '$lib/components/IconButton.svelte';
    import { KebabHorizontal16 } from 'svelte-octicons';

    export let comment;
    // I don't know if this is necessary
    //let offset = new Date(comment.Timestamp).getTimezoneOffset();
    //let timestamp = new Date(comment.Timestamp - offset * 60 * 1000);
</script>

<article id={comment.CommentID} class="comment">
    <section>
        <UserPortrait username={comment.creator.Username} src={comment.creator.ProfilePicture} size={3} />
    </section>
    <section class="content">
        <header>
            <h3><a href={"/user/"+comment.creator.Username}>@{comment.creator.Username}</a></h3>
            <p>{ago(new Date(comment.Timestamp))}</p>
        </header>
        {#if comment.Content.length > 196}
            <input type="checkbox" id="ch" class="hidden">
            <section class="text-full">
                <p>{comment.Content}</p>
                <label for="ch"><i>Show less</i></label>
            </section>
            <section class="text-short">
                <p>{comment.Content.substring(0, 196)}...</p>
                <label for="ch"><i>Read more</i></label>
            </section>
        {:else}
            <p>{comment.Content}</p>
        {/if}
    </section>
    <section class="actions">
        <IconButton shape="circle" disableBackground>
            <KebabHorizontal16 />
        </IconButton>
    </section>
</article>

<style>
    .text-full,
    #ch:checked ~ .text-short {
        display: none;
    }

    #ch:checked ~ .text-full {
        display: block;
    }

    .content label {
        display: inline-block;
        font-weight: 500;
        margin: 0;
        margin-top: 0.5rem;
    }

    .content label:hover {
        cursor: pointer;
        text-decoration: underline;
    }

    .comment {
        position: relative;
        display: grid;
        grid-template-columns: 3rem 1fr;
        gap: 0.5rem;
    }

    .comment .actions {
        position: absolute;
        top: 0;
        right: 0;
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
        margin-bottom: 0.25rem;
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
        margin: 0;
        line-height: 1.3rem;
        white-space: pre-wrap;
    }

    .comment .content {
        padding: 0.25rem 0.5rem;
    }
</style>
