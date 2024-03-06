<script>
    /** @type {import('./$types').PageData} */
    export let data;
</script>

<main>
    <section class="image-upload">
        <h1>Upload Images</h1>
        <button type="submit">Add Image</button>
    </section>
    <aside class="edit-image-details round-corners">
        <h3>Edit Image</h3>
        <hr />
        <form>
            <label for="title">Title</label>
            <input type="text" id="title" name="title" />
            <label for="description">Description</label>
            <textarea id="description" name="description"></textarea>
            <label for="tags">Tags</label>
            <input type="text" id="tags" name="tags" />
            <button type="submit">Save</button>
        </form>
    </aside>
</main>

<style>
    .edit-image-details {
        width: 20rem;
        background: var(--color-white-gradient);
        border: 1px solid var(--color-gray);
    }

    .edit-image-details h3 {
        padding: 1rem;
        margin: 0;
    }

    .edit-image-details hr {
        color: var(--color-gray);
        margin: 0;
        border-bottom: 1px;
    }
    
    .edit-image-details form {
        display: flex;
        flex-direction: column;
        padding: 1rem;
    }
</style>