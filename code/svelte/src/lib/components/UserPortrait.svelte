<script>
    export let src = '';
    export let size = 2;
    export let color = 'white';
    export let userId;
</script>

<a href="/user/john_doe" class="border-color-{color} border-thickness-{size}">
    <img {src} alt="" class="size-{size}">
</a>

<style>
    a {
        border-radius: 50%;
        display: block;
        overflow: hidden;
        border: 2px solid white;
    }

    .border-thickness-2 {
        border-width: 1px;
    }

    .border-color-gray {
        border-color: var(--color-gray);
    }

    .size-2 {
        width: 2rem;
        height: 2rem;
    }
    
    .size-3 {
        width: 3rem;
        height: 3rem;
    }

    .size-7 {
        width: 7rem;
        height: 7rem;
    }
</style>