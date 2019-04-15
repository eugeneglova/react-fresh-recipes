import React, { useReducer } from "react";
import "./App.css";

const initialState = {
  loading: false,
  recipes: [],
  ingredients: []
};

const types = {
  SET_LOADING: "SET_LOADING",
  SET_RECIPES: "SET_RECIPES",
  SET_INGREDIENTS: "SET_INGREDIENTS"
};

const reducer = (state, action) => {
  switch (action.type) {
    case types.SET_LOADING: {
      const { payload: loading } = action;
      return { ...state, loading };
    }

    case types.SET_RECIPES: {
      const { payload: recipes } = action;
      return { ...state, recipes };
    }

    case types.SET_INGREDIENTS: {
      const { payload: ingredients } = action;
      return { ...state, ingredients };
    }

    default: {
      return state;
    }
  }
};

const fetchRecipes = async () =>
  (await fetch("http://www.mocky.io/v2/5c85f7a1340000e50f89bd6c")).json();
const fetchIngredients = async () =>
  (await fetch("https://www.mocky.io/v2/5cac82f1300000664f10368f")).json();

const actions = {
  setLoading: payload => ({ type: types.SET_LOADING, payload }),
  setRecipes: payload => ({ type: types.SET_RECIPES, payload }),
  setIngredients: payload => ({ type: types.SET_INGREDIENTS, payload })
};

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

  return (
    <div className="App">
      <header className="App-header">
        <button type="button" onClick={() => fetch()}>
          What's For Lunch?
        </button>
      </header>
    </div>
  );
};

export default App;
