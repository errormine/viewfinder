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
        let autocomplete = document.querySelector('#autocomplete');
        
        search.addEventListener('input', () => {
            let value = search.value;
            
            fetch(`/api/search?q=${value}`)
                .then(response => response.json())
                .then(data => {
                    autocomplete.innerHTML = '';
                    autocomplete.classList.toggle('hidden', value === '' || data.length === 0);

                    for (let suggestion of data) {
                        let suggestionElement = document.createElement('li');

                        suggestionElement.innerText = suggestion.Title;
                        suggestionElement.innerHTML = suggestion.Title.replace(new RegExp(value, 'gi'), match => `<strong>${match}</strong>`);
                        autocomplete.appendChild(suggestionElement);
                        
                        suggestionElement.addEventListener('click', () => {
                            search.value = suggestion.Title;
                            document.querySelector('form').submit();
                        });
                    }
                });
        });

        // Keyboard navigation
        search.addEventListener('keydown', event => {
            let selected = autocomplete.querySelector('li.selected');

            if (event.key === 'ArrowDown') {
                event.preventDefault();
                if (selected) {
                    selected.classList.remove('selected');
                    selected = selected.nextElementSibling || autocomplete.firstElementChild;
                } else {
                    selected = autocomplete.firstElementChild;
                }

                selected.classList.add('selected');
            } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                if (selected) {
                    selected.classList.remove('selected');
                    selected = selected.previousElementSibling || autocomplete.lastElementChild;
                } else {
                    selected = autocomplete.lastElementChild;
                }

                selected.classList.add('selected');
            } else if (event.key === 'Enter' && selected) {
                event.preventDefault();
                search.value = selected.innerText;
                document.querySelector('form').submit();
            }
        });

        // Hide autocomplete when clicking outside
        document.addEventListener('click', event => {
            if (!event.target.closest('search')) {
                autocomplete.classList.add('hidden');
            } else if (event.target.closest('search') && search.value !== '') {
                autocomplete.classList.remove('hidden');
            }
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
    <ul id="autocomplete" class="round-corners hidden"></ul>
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

    #autocomplete {
        background-color: white;
        position: absolute;
        top: 2.5rem;
        left: 0;
        width: 35rem;
        padding: 0.25rem;
    }

    :global(#autocomplete li) {
        list-style-type: none;
        padding: 0.5rem;
        border-radius: 0.25rem;
        cursor: pointer;
        transition: background-color 100ms;
    }

    :global(#autocomplete li:hover),
    :global(#autocomplete li.selected) {
        background: var(--color-light-gray);
    }
</style>
