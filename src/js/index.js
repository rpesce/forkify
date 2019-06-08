//install axios via npm
import axios from 'axios';

async function getResults(query) {
    const proxy = 'www.exampleproxy.com/';
    const key = 'authkeystring';
    try {
        const res = await axios(`${proxy}www.url.com/${key}`);
        const recipes = res.data.recipes;
        console.log(recipes);
    } catch (error) {
        alert(error);
    }
};

getResults('pizza');