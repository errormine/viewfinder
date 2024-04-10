<script>
    import Post from '$lib/components/Post.svelte';

    /** @type {import('./$types').PageData} */
    export let data;

    console.log(data);
</script>

<main class="content-grid">
    <section>
        <h2>Feed</h2>
        {#if data.posts.length > 0}
            <ul>
                {#each data.posts as post}
                    <Post {post} />
                {/each}
            </ul>
        {/if}
        <p>No new posts to show.</p>
    </section>
</main>
