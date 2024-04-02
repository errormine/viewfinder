<script>
    import { onMount } from 'svelte';
    import { Plus16, X16 } from 'svelte-octicons';
    import Button from '$lib/components/Button.svelte';
    import IconButton from '$lib/components/IconButton.svelte';
    import ImagePreview from '$lib/components/ImagePreview.svelte';

    /** @type {import('./$types').PageData} */
    export let data;

    let albumDialog;
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

<dialog bind:this={albumDialog} class="create-album-dialog round-corners" open="true">
    <section>
        <header class="flex space-between align-center margin-bottom-1">
            <h2 class="margin-0">Create a new album</h2>
            <IconButton on:click={albumDialog.close()} title="Cancel album creation" disableBackground>
                <X16 />
            </IconButton>
        </header>
        <form action="/api/edit/album" method="POST" class="flex-column">
            <label for="album-name">Name</label>
            <input type="text" id="album-name" name="album-name" placeholder="Enter a name."/>

            <label for="album-description">Description</label>
            <input type="text" id="album-description" name="album-description" placeholder="Enter a description."/>

            <Button type="submit">Create</Button>
        </form>
    </section>
</dialog>
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
                <form class="flex-column">
                    <label for="title">Title</label>
                    <input type="text" id="title" name="title" placeholder="Enter a title."/>

                    <label for="description">Description</label>
                    <textarea id="description" name="description" placeholder="Enter a description."></textarea>

                    <section class="flex space-between align-center">
                        <label for="album">Album</label>
                        <IconButton on:click={albumDialog.showModal()} disableBackground>
                            <Plus16 />
                        </IconButton>
                    </section>
                    <select id="albumName" name="albumName">
                        {#each data.userAlbums as album}
                            <option value="{album.AlbumID}">{album.Name}</option>
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

    .create-album-dialog {
        min-width: 20rem;
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
