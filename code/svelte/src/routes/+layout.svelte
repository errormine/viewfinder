<script>
	import { page } from '$app/stores';
	import Header from './Header.svelte';
	import './styles.css';
	import UploadModal from '$lib/images/UploadModal.svelte';

	let isUploadModalOpen = false;

	function handleToggleModal(event) {
		isUploadModalOpen = event.detail.isOpen;
	}
</script>

<div class="app" class:signup-page="{$page.url.pathname === '/signup'}" class:main-page="{$page.url.pathname === '/'}">
	<Header on:togglemodal={handleToggleModal} />
	{#if isUploadModalOpen}
	<div class="upload-overlay">
	  <UploadModal isOpen={isUploadModalOpen} on:close={() => isUploadModalOpen = false} />
	</div>
	{/if}
	<main class:profile-page="{$page.url.pathname === '/profile'}" class:feed-page="{$page.url.pathname === '/feed'}" class:explore-page="{$page.url.pathname === '/explore'}">
		<slot />
	</main>

	<div class="feature-text">
		<h5>Photo featured by Some Name</h5>
	</div>

	<footer>
		<p><a href="https://kit.svelte.dev">About</a> | <a href="https://kit.svelte.dev">Help</a> | <a href="https://kit.svelte.dev">Privacy</a> | <a href="https://kit.svelte.dev">Terms</a></p>
		<p>@All Rights Reserved</p>
	</footer>
</div>

<style>

	/* Global styles */
	* {
		box-sizing: border-box; /* Make sure padding and borders are included in the width calculation */
	    margin: 0; /* Reset margins for all elements */
	}

	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		width: 100%;
	}

	/* Overlay styles - based on pages */
    .signup-page, .main-page {
        background: url('/samplebackground.jpg') no-repeat center center;
        background-size: cover;
    }

    .signup-page::before, .main-page::before, .upload-overlay::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.70); /* Overlay color */
        z-index: 1; /* Below content but above the background */
    }

    /* Ensure content is above the overlay */
    .signup-page > *, .main-page > *, .upload-overlay {
        position: relative;
        z-index: 2;
    }

	.feature-text {
		display: absolute;
		color: rgba(255, 254, 254, 0.612); /* Text color */
		font-size: 1em; /* Text size */
		z-index: 2; /* Above the overlay */
	}

	.profile-page {
		flex: 1;
		display: block; /* Set main as a flex container */
		overflow-y: auto; /* This will add a scrollbar to the main content area if the content overflows */
	}

	.feed-page, .explore-page {
		flex: 1;
		display: flex; /* Set main as a flex container */
		flex-direction: column; /* Stack children vertically - centers them with align items*/
		align-items: center; /* Center children horizontally */
		justify-content: center; /* Center children vertically */
		overflow-y: auto; /* This will add a scrollbar to the main content area if the content overflows */
  		margin: 0 auto;
	}

	.main-page main {
		flex: 1;
		display: flex; /* Set main as a flex container */
		flex-direction: column; /* Stack children vertically */
		align-items: center; /* Center children horizontally */
		justify-content: center; /* Center children vertically */
		overflow-y: auto; /* This will add a scrollbar to the main content area if the content overflows */
  		margin: 0 auto;
	}

	.signup-page main {
		flex: 1;
		display: flex; /* Set main as a flex container */
		flex-direction: column; /* Stack children vertically */
		align-items: center; /* Center children horizontally */
		justify-content: center; /* Center children vertically */
		overflow-y: auto; /* This will add a scrollbar to the main content area if the content overflows */
  		margin: 0 auto;
	}

	footer {
		font-size: 0.8rem;
		height: fit-content;
		display: flex;
		padding: .5rem 0; /* Reduced vertical padding */
		color: white; /* Make all text in the footer white */
		background-color: #000; /* Starting color for the gradient */
		background-image: linear-gradient(to top, #000, #333); /* Gradient from black to lighter grey */
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	footer p {
		margin: 0.25rem 0; /* Reduce spacing between paragraphs if needed */
	}
</style>
