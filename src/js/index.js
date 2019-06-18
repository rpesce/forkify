import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';

/*Global state of the app
- Search object
- Current recipe object
- Shopping list object
- Liked recipes */
const state = {};


/*Serch controller
*/
const controlSearch = async () => {
    //1. Get the query from view
    const query = searchView.getInput();
    
    if (query) {
        //2.NEW SEARCH OBJECT AND ADD TO STATE
        state.search = new Search(query);
    
        //3.Prepare UI fro results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            //4.Search for recipes
            await state.search.getResults();

            //5.Render results on the UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (err) {
            alert(`Error 2: ${err}`);
            clearLoader();
        }
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if(btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    };
});

/*Recipe controller
*/
const controlRecipe = async () => {
    //Get ID from URL
    const id = window.location.hash.replace('#', '');
    
    if (id) {
        //prepre UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        //Highlight the selected
        if (state.search) searchView.highlightSelected(id);

        //Create new recipe object
        state.recipe = new Recipe(id);

        try {
            //Get recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            //Calc time and servings
            state.recipe.calcTime();
            state.recipe.calcServings();

            //Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);

        } catch (err) {
            alert(err);
        }
    }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if(e.target.matches('.btn-decrease, .btn-decrease *')){
        if(state.recipe.servings > 1 ) {
            state.recipe.updateServings('dec');
            recipeView.updateServingIngredients(state.recipe);
        }
    } else if(e.target.matches('.btn-increase, .btn-increase *')){
        state.recipe.updateServings('inc');
        recipeView.updateServingIngredients(state.recipe);
    }
});