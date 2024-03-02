<script>
    import TopBar from '$lib/components/TopBar.svelte';
    import Footer from '$lib/components/Footer.svelte';
</script>

<TopBar />
<main>
    <slot />
</main>
<Footer />