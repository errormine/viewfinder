<script>
	import { page } from '$app/stores';
	import profile from '$lib/images/github.svg';
	import welcome from '$lib/images/svelte-welcome.png';
	import { createEventDispatcher } from 'svelte';
	// ... other imports

	const dispatch = createEventDispatcher();
	let isUploadModalOpen = false;

	export function toggleUploadModal() {
		isUploadModalOpen = !isUploadModalOpen;
		dispatch('togglemodal', { isOpen: isUploadModalOpen });
	}
</script>

<svelte:head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</svelte:head>

<header>
	<div class="left-side">
		<div class="welcome">
			<a href="https://kit.svelte.dev">
				<img src={welcome} alt="site logo" />
			</a>
		</div>
	
		<nav>
			<ul>
				<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
					<a href="/">Home</a>
				</li>
				<li aria-current={$page.url.pathname === '/feed' ? 'page' : undefined}>
					<a href="/feed">Feed</a>
				</li>
				<li aria-current={$page.url.pathname === '/explore' ? 'page' : undefined}>
					<a href="/explore">Explore</a>
				</li>
			</ul>
		</nav>
	</div>

	<div class="search-container">
		<i class="fa fa-search search-icon"></i>
		<input type="text" placeholder="Search for solar eclipse" class="search-input" />
	</div>

	<div class="right-side">
		<button class="upload-button right-side fa fa-cloud-upload" on:click={toggleUploadModal} on:close={toggleUploadModal}></button>
		<div class="profile">
			<a href="/profile">
				<img src={profile} alt="profile" />
			</a>
		</div>
	</div>
</header>

<style>
	header {
		display: flex;
		align-items: center;
		background-color: #fff;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
		padding: 0 1rem;
		padding-bottom: 0.3rem;
		padding-top: 0.3em;
	}

	.left-side, .right-side {
		display: flex;
		align-items: center;
	}

	.welcome {
		width: 3em;
		height: 3em;
		margin-right: 1.2em;
	}

	.welcome a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.welcome img {
		width: 7em;
		height: 5em;
		object-fit: contain;
	}

	nav {
		display: flex;
		/* --background: rgba(255, 255, 255, 0.7); */
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}

	.search-container {
		flex-grow: 2; /* Allows the search container to grow */
		display: flex;
		justify-content: flex-start; /* Aligns the search bar to the left */
		margin-inline: 4rem;
	}

	.search-icon {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		margin-right: 0.5rem; /* Add some space between the icon and the input field */
		margin-bottom: 0.15rem;
		font-size: 1.3rem; /* Adjust the size as needed */
		color: #ccc; /* Color of the icon */
	}

	.search-input {
		flex-grow: 1; /* Allows the input to take up available space */
		padding: 0.5rem;
		border: 2px solid #ccc; /* Gives the search bar a border */
		border-radius: 2rem;
		margin-right: 0.5rem;
		width: 100%; /* Ensures the input takes full width of its container */
	}

	.right-side {
		display: flex;
		justify-content: flex-end; /* Aligns the right side elements to the end */
	}

	.upload-button {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
	}

	.profile {
		width: 3em;
		height: 3em;
	}

	.profile a {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		width: 100%;
		height: 100%;
	}

	.profile img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}
</style>
