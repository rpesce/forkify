import Search from './models/Search';

/*Global state of the app
- Search object
- Current recipe object
- Shopping list object
- Liked recipes */
const state = {};

const controlSearch = async () => {
    //1. Get the query from view
    const query = 'pizza';
    
    if (query) {
        //2.NEW SEARCH OBJECT AND ADD TO STATE
        state.search = new Search(query);
    
        //3.Prepare UI fro results

        //4.Search for recipes
        await state.search.getResults();

        //5.Render results on the UI
        console.log(state.search.result);
    }
}

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});


