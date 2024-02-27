<section>
    <h2><a href="/">Featured Photo</a></h2>
    <p>by <a href="/">John Doe</a></p>
</section>

<style>
    :global(main) {
        background: url(https://picsum.photos/1920/1080) no-repeat center;
        background-size: cover;
        position: relative;
    }

    section {
        display: block;
        position: absolute;
        bottom: 0;
        width: 100%;
        text-align: center;
        color: white;
        text-shadow: black 1px 0px 8px;
    }

    section a {
        color: white;
        text-decoration: none;
    }
</style>