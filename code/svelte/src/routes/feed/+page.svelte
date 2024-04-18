<script>
    import Post from '$lib/components/Post.svelte';
    import PostActivity from '$lib/components/PostActivity.svelte';

    /** @type {import('./$types').PageData} */
    export let data;

    console.log(data);
</script>

<main class="feed-page">
    <section class="posts flex-column gap-05">
        {#if data.activity.length > 0}
            {#each data.activity as item}
                {#if item.type === "photo"}
                    <Post post={item} />
                {:else}
                    <PostActivity activity={item} />
                {/if}
            {/each}
        {/if}
    </section>
</main>

<style>
    .feed-page {
        display: grid;
        grid-template-columns: 1fr [main-start] 35rem [main-end] 1fr;
    }
    
    .posts {
        padding: 1rem;
        margin: 0 auto;
        grid-column: main;
    }
</style>
