<script>
    import ProfileBubble from "$lib/components/ProfileBubble.svelte";
</script>

<section class="profile-bubbles">
    <ProfileBubble label="Website" href="https://example.com" />
    <ProfileBubble label="Contact" href="mailto:contact@example.com" />
</section>
<section class="user-bio">
    <p>Here is the user bio I guess</p>

<style>
    .profile-bubbles {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }
</style>