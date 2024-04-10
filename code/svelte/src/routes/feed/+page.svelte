<script>
    import Post from '$lib/components/Post.svelte';

    /** @type {import('./$types').PageData} */
    export let data;

    console.log(data);
</script>

<main class="content-grid">
    <section class="posts flex-column gap-1">
        {#if data.posts.length > 0}
            {#each data.posts as post}
                <Post {post} />
            {/each}
        {/if}
    </section>
</main>

<style>
    .posts {
        padding: 1rem;
    }
</style>
