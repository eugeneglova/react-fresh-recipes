import React from "react";

import { useDataApi } from "./hooks";
import "./App.css";

const dateFilter = date => new Date(date).getTime() > new Date().getTime();

const getIngredientsFilter = ingredientsTitles => title =>
  ingredientsTitles.indexOf(title) !== -1;

const getTitle = ({ title }) => title;

const getFilteredRecipes = (recipes, ingredients) => {
  const freshIngredients = ingredients.filter(({ "use-by": date }) =>
    dateFilter(date)
  );

  const freshIngredientsTitles = freshIngredients.map(getTitle);

  const bestIngredientsTitles = freshIngredients
    .filter(({ "best-before": date }) => dateFilter(date))
    .map(getTitle);

  const bestRecipes = recipes.filter(({ ingredients }) =>
    ingredients.every(getIngredientsFilter(bestIngredientsTitles))
  );

  const otherRecipes = recipes.filter(
    ({ ingredients }) =>
      !ingredients.every(getIngredientsFilter(bestIngredientsTitles)) &&
      ingredients.every(getIngredientsFilter(freshIngredientsTitles))
  );

  return bestRecipes.concat(otherRecipes);
};

const dataUrls = {
  recipes: "https://www.mocky.io/v2/5c85f7a1340000e50f89bd6c",
  ingredients: "https://www.mocky.io/v2/5cac82f1300000664f10368f"
};

const App = () => {
  const [
    {
      data: {
        recipes: { recipes = [] } = {},
        ingredients: { ingredients = [] } = {}
      },
      loading
    },
    doFetch
  ] = useDataApi();

  return (
    <div className="App">
      <header className="App-header">
        {loading ? (
          <h1>Loading...</h1>
        ) : recipes.length === 0 ? (
          <button type="button" onClick={() => doFetch(dataUrls)}>
            <h1>What's For Lunch?</h1>
          </button>
        ) : (
          getFilteredRecipes(recipes, ingredients).map(recipe => (
            <Recipe key={recipe.title} recipe={recipe} />
          ))
        )}
      </header>
    </div>
  );
};

const Recipe = ({ recipe }) => {
  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>What you'll need:</p>
      <ul>
        {recipe.ingredients.map(ingredient => (
          <Ingredient key={ingredient} title={ingredient} />
        ))}
      </ul>
    </div>
  );
};

const Ingredient = ({ title }) => <li>{title}</li>;

export default App;
