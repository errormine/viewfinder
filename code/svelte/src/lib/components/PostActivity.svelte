<script>
    import UserPortrait from '$lib/components/UserPortrait.svelte';

    export let activity = {};
</script>

{#if activity.type == "favorite"}
    <a href={"/photo/"+activity.PhotoID} class="round-corners">
        <section>
            <UserPortrait username={activity.creator.Username} src={activity.creator.ProfilePicture} size="2" />
        </section>
        <section>
            <small><i>{activity.creator.DisplayName} favorited your post</i></small>
            <p>{activity.Title}</p>
        </section>
    </a>
{:else if activity.type == "comment"}
    <a href={"/photo/"+activity.PhotoID+"#"+activity.CommentID} class="round-corners">
        <section>
            <UserPortrait username={activity.creator.Username} src={activity.creator.ProfilePicture} size="2" />
        </section>
        <section>
            <small><i>{activity.creator.DisplayName} commented on &ldquo;{activity.Title}&rdquo;</i></small>
            <p>{activity.Content}</p>
        </section>
    </a>
{/if}

<style>
    a {
        display: grid;
        grid-template-columns: 2rem 1fr;
        gap: 1rem;
        padding: 0.75rem;
        border: 1px solid var(--color-gray);
        background: var(--gradient-white);
        text-decoration: none;
        color: black;
    }

    small {
        color: var(--color-dark-gray);
    }

    p {
        margin: 0;
        white-space: pre-wrap;
    }
</style>
