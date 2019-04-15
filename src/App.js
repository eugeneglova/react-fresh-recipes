import React, { useReducer } from "react";

import { initialState, reducer, actions } from "./reducer";
import "./App.css";

const fetchRecipes = async () =>
  (await fetch("https://www.mocky.io/v2/5c85f7a1340000e50f89bd6c")).json();

const fetchIngredients = async () =>
  (await fetch("https://www.mocky.io/v2/5cac82f1300000664f10368f")).json();

const dateFilter = date => new Date(date).getTime() > new Date().getTime();

const getIngredientsFilter = ingredientsTitles => title =>
  ingredientsTitles.indexOf(title) !== -1;

const getTitle = ({ title }) => title;

const App = () => {
  const [{ recipes, ingredients }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const fetch = async () => {
    dispatch(actions.setLoading(true));
    const [{ recipes }, { ingredients }] = await Promise.all([
      fetchRecipes(),
      fetchIngredients()
    ]);
    dispatch(actions.setRecipes(recipes));
    dispatch(actions.setIngredients(ingredients));
    dispatch(actions.setLoading(false));
  };

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

  return (
    <div className="App">
      <header className="App-header">
        {recipes.length === 0 ? (
          <button type="button" onClick={() => fetch()}>
            What's For Lunch?
          </button>
        ) : (
          bestRecipes
            .concat(otherRecipes)
            .map(recipe => <Recipe key={recipe.title} recipe={recipe} />)
        )}
      </header>
    </div>
  );
};

const Recipe = ({ recipe }) => {
  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>What you need:</p>
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
