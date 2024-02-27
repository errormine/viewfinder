<script>
    import { createEventDispatcher } from 'svelte'; //used to enable revert changes to CSS in main/layout
    export let isOpen;

  const dispatch = createEventDispatcher();

  let file;
  let description = '';
  let selectedAlbum = '';
  let selectedTag = '';
  const albums = ['Album 1', 'Album 2', 'Album 3']; 
  const tags = ['Tag 1', 'Tag 2', 'Tag 3']; 

  function handleSubmit(event) {
    event.preventDefault();
    // logic for submitting to database
    console.log({
      file,
      description,
      selectedAlbum,
      selectedTag
    });
    closeModal();
  }
  
  function closeModal() {
    dispatch('close');
  }
  </script>
  
  <style>
    .modal {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 20;
    }
    .modal-content {
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        max-width: 500px;
        width: 100%;
    }
    h2 {
        margin-top: 0;
    }
    .form-group {
        margin-bottom: 1rem;
    }
    .form-group label {
        display: block;
        margin-bottom: .5rem;
    }
    .input-file, .input-text, .input-select {
        width: 100%;
        padding: 8px;
        margin-bottom: 10px;
        border-radius: 4px;
        border: 1px solid #ccc;
    }
    .input-text {
        height: 100px;
    }
    .form-actions {
        text-align: right;
    }
    .btn-submit, .btn-cancel {
        padding: 10px 15px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin-left: 10px;
    }
    .btn-submit {
        background-color: #4CAF50;
        color: white;
    }
    .btn-cancel {
        background-color: #f44336;
        color: white;
    }
  </style>

 <!-- <div class="modal" class:active={isOpen}>
     -- Modal content for photo upload
    <p>Upload your photo here</p>
    -- Close button or area
    <button on:click={() => isOpen = false}>Close</button>
  </div>
-->
<!-- 
  <div class="{isOpen ? 'modal active' : 'modal'}">
    -- Modal content for photo upload
    <p>Upload your photo here</p>
    -- Close button or area
    <button on:click={closeModal}>Cancel</button>
  </div>
-->
{#if isOpen}
<div class="modal">
  <div class="modal-content">
    <h2>Upload Photo</h2>
    <form on:submit={handleSubmit}>
      <div class="form-group">
        <label for="file">Image</label>
        <input type="file" id="file" bind:files={file} class="input-file"/>
      </div>
      
      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" bind:value={description} class="input-text"></textarea>
      </div>
      
      <div class="form-group">
        <label for="album">Album</label>
        <select id="album" bind:value={selectedAlbum} class="input-select">
          {#each albums as album}
            <option value={album}>{album}</option>
          {/each}
        </select>
      </div>
      
      <div class="form-group">
        <label for="tag">Tag</label>
        <select id="tag" bind:value={selectedTag} class="input-select">
          {#each tags as tag}
            <option value={tag}>{tag}</option>
          {/each}
        </select>
      </div>
      
      <div class="form-actions">
        <button type="button" class="btn-cancel" on:click={closeModal}>Cancel</button>
        <button type="submit" class="btn-submit">Upload</button>
      </div>
    </form>
  </div>
</div>
{/if}