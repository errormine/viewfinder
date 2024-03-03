<!-- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/search -->
<script>
    import { Search16 } from 'svelte-octicons';

    let searches = ['landscape', 'portrait', 'nature', 'architecture', 'street', 'wildlife', 'macro', 'sports', 'fashion', 'food', 'black and white', 'abstract', 'still life', 'long exposure', 'aerial', 'cityscape', 'sunrise', 'sunset', 'beach', 'mountain', 'forest', 'waterfall', 'desert', 'sky', 'clouds', 'flowers', 'birds', 'insects', 'pets', 'cars', 'bikes', 'boats', 'planes', 'trains'];

    let randomPlaceholders = searches.sort(() => Math.random() - 0.5).slice(0, 3);
    let placeholder = `Search for ${randomPlaceholders[0]}, ${randomPlaceholders[1]}, ${randomPlaceholders[2]}`;
</script>

<search>
    <input class="search-bar inset-bg" type="text" {placeholder}>
    <button class="submit">
        <Search16 />
    </button>
</search>

<style>
    search {
        position: relative;
        display: block;
    }

    .search-bar {
        width: 35rem;
        height: 2rem;
        font-size: 1rem;
        border: 1px solid var(--color-gray);
        border-radius: 1rem;
        text-indent: 2.25rem;
    }
    
    .search-bar::placeholder {
        font-style: italic;
    }

    .submit {
        border: none;
        background-color: transparent;
        position: absolute;
        padding: 0;
        margin: 0.5rem auto;
        left: 0.8rem;
        opacity: 0.5;
        transition: opacity 200ms;
    }

    .submit:hover {
        cursor: pointer;
        opacity: 1;
    }
</style>