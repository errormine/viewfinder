<script>
    export let size;
    export let userId;
</script>

<a href="/user/john_doe">
    <img src="https://picsum.photos/{size}" alt="" width="{size}px" height="{size}px">
</a>

<style>
    img {
        width: auto;
        border-radius: 50%;
        border: 2px white solid;
        margin-right: 1rem;
    }
</style>