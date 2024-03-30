<script>
    import { Search16 } from 'svelte-octicons';
    import { onMount } from 'svelte';

    // Random placeholder text
    let searches = ['landscape', 'portrait', 'nature', 'architecture', 'street', 'wildlife', 'macro', 'sports', 'fashion', 'food', 'black and white', 'abstract', 'still life', 'long exposure', 'aerial', 'cityscape', 'sunrise', 'sunset', 'beach', 'mountain', 'forest', 'waterfall', 'desert', 'sky', 'clouds', 'flowers', 'birds', 'insects', 'pets', 'cars', 'bikes', 'boats', 'planes', 'trains'];
    let randomPlaceholders = searches.sort(() => Math.random() - 0.5).slice(0, 3);
    let placeholder = `Search for ${randomPlaceholders[0]}, ${randomPlaceholders[1]}, ${randomPlaceholders[2]}`;

    onMount(() => {
        // Autocomplete suggestions
        let search = document.querySelector('.search-bar');
        
        search.addEventListener('input', () => {
            let value = search.value;
            let suggestions = fetch(`/api/search?q=${value}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                });

            console.log(suggestions);
        });
    });
</script>

<search>
    <form action="/search">
        <button class="submit">
            <Search16 />
        </button>
        <input class="search-bar inset-bg" type="text" name="q" {placeholder}>
    </form>
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
        text-indent: 1.5rem;
        color: var(--color-dark-gray);
        transition: color 200ms;
    }

    .search-bar:hover,
    .search-bar:focus-within {
        color: black;
    }
    
    .search-bar::placeholder {
        font-style: italic;
    }

    .submit {
        position: absolute;
        width: 2rem;
        height: 2rem;
        border: none;
        background: transparent;
        left: 0.25rem;
    }
</style>
