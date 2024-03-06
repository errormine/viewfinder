<!-- Lets you access props when the component is created programatically -->
<svelte:options accessors />

<script>
    export let _element;
    export let src = "";
    export let onClick = () => {};
</script>

<button bind:this={_element} on:click={onClick}>
    <img {src} alt="">
</button>

<style>
    img {
        object-fit: cover;
        width: 100%;
        height: 100%;
    }
</style>