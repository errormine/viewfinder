import * as db from '$lib/server/mariadb';
import natural from 'natural';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
    const searchQuery = url.searchParams.get('q');
    const stopwords = new Set(['a', 'an', 'and', 'are', 'as', 'at', 
    'be', 'by', 'for', 'from', 'has', 'he', 'in', 'is', 'it', 'its', 
    'of', 'on', 'that', 'the', 'to', 'was', 'were', 'will', 'with']);
    
    let tokenizer = new natural.WordTokenizer();
    let tokens = tokenizer.tokenize(searchQuery);
    
    // Remove stopwords from tokens
    tokens = tokens.filter(token => !stopwords.has(token));

    // Stem the tokens to increase the chances of finding a match
    // For example: searching for "running" should also find "run"
    // Two stemmers are used because they have different results
    const porterStemmed = tokens.map(token => natural.PorterStemmer.stem(token));
    const lancasterStemmed = tokens.map(token => natural.LancasterStemmer.stem(token));
    let stems = Array.from(new Set([...porterStemmed, ...lancasterStemmed]));

    return {
        results: await db.searchPhotos(tokens.join(' '), stems),
    };
};
