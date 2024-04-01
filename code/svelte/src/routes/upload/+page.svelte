<script>
    import { onMount } from 'svelte';
    import Button from '$lib/components/Button.svelte';
    import ImagePreview from '$lib/components/ImagePreview.svelte';

    /** @type {import('./$types').PageData} */
    export let data;

    let isImageSelected = false;
    let selectedImageIndex;

    // Image objects to be uploaded to database
    let images = [];

    function appendImage(title, previewURL, fileData) {
        images.push({
            _preview: previewURL,
            title: title,
            description: "This is a description.",
            tags: [],
            data: fileData,
        });
    }

    // Image previews
    let imageOnClick = (e) => {
        let imgData = images.find(i => i._preview === e.currentTarget);
        
        isImageSelected = true;
        selectedImageIndex = images.indexOf(imgData);
        document.querySelector('#title').value = imgData.title;
        document.querySelector('#description').value = imgData.description;
    }

    function createPreview(src) {
        let previewComponent = new ImagePreview({
            target: document.querySelector('#image-previews'),
            props: {
                src,
                onClick: imageOnClick
            }
        });

        return previewComponent._element;
    }

    // Image files handler
    let files;

    $: if (files) {
        for (const file of files) {
            const reader = new FileReader();
            
            reader.readAsDataURL(file);
            reader.addEventListener('load', () => {
                let previewURL = createPreview(reader.result);
                appendImage(file.name, previewURL, file);
            });
        };
    }

    // Upload handler
    function handleUpload() {
        for (const img of images) {
            const formData = new FormData();
            formData.append('title', img.title);
            formData.append('description', img.description);
            formData.append('tags', img.tags);
            formData.append('photo', img.data);

            console.log(formData);

            fetch('/api/upload', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                console.log(response);
                // Redirect to user profile
                location.reload();
            })
            .catch(error => {
                console.error(error);
                data.bio = 'Error uploading image.';
            });
        }
    }

    onMount(() => {
        // Metadata editor
        let title = document.querySelector('#title');
        let description = document.querySelector('#description');

        title.addEventListener('input', () => {
            images[selectedImageIndex].title = title.value;
        });

        description.addEventListener('input', () => {
            images[selectedImageIndex].description = description.value;
        });
    })
</script>

<main>
    <section class="upload-menu">
        <section class="image-upload">
            <h1>Upload Images</h1>
            <section id="image-previews">
                <section id="upload-button">
                    <input bind:files type="file" accept="image/png, image/jpeg" multiple id="file-upload" name="file-upload" class="hidden">
                    <label for="file-upload" class="round-corners">Add Image</label>
                </section>
            </section>
        </section>
        <section class="options">
            <aside class="edit-image-details round-corners" class:hidden={!isImageSelected}>
                <h3>Edit Image</h3>
                <hr />
                <form>
                    <label for="title">Title</label>
                    <input type="text" id="title" name="title" placeholder="Enter a title."/>

                    <label for="description">Description</label>
                    <textarea id="description" name="description" placeholder="Enter a description."></textarea>

                    <label for="album">Album</label>
                    <select id="albumName" name="albumName">
                        {#each data.userAlbums as album}
                            <option value="{album.Name}">{album.Name}</option>
                        {/each}
                    </select>

                    <label for="tags">Tags</label>
                    <input type="text" id="tags" name="tags" />
                </form>
            </aside>
            <section id="upload-actions" class="flex space-between">
                <Button on:click={handleUpload}>Upload Images</Button>
            </section>
        </section>
    </section>
</main>

<style>
    main {
        height: calc(100% - var(--footer-height));
    }

    .upload-menu {
        display: grid;
        grid-template-columns: 1fr 20rem;
        gap: 1rem;
        padding: 2rem;
        height: 100%;
    }

    #upload-button label {
        display: block;
        width: 100%;
        height: 100%;
        background: var(--color-gray-gradient);
        border: 1px solid var(--color-gray);
        text-align: center;
    }

    #image-previews {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
        grid-template-rows: repeat(auto-fill, 8rem);
        gap: 0.5rem;
    }

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
        margin: 0;
        border: 0.5px solid var(--color-gray);
    }
    
    .edit-image-details form {
        display: flex;
        flex-direction: column;
        padding: 1rem;
    }

    .options {
        position: relative;
    }
    
    #upload-actions {
        width: 100%;
        position: absolute;
        bottom: 0;
    }
</style>
