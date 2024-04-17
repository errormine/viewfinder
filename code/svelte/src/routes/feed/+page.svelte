<script>
    import Post from '$lib/components/Post.svelte';
    import PostActivity from '$lib/components/PostActivity.svelte';

    /** @type {import('./$types').PageData} */
    export let data;

    console.log(data);
</script>

<main class="content-grid">
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
    .posts {
        padding: 1rem;
        margin: 0 auto;
    }
</style>
