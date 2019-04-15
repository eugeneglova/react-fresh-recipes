export const initialState = {
  loading: false,
  recipes: [],
  ingredients: []
};

const types = {
  SET_LOADING: "SET_LOADING",
  SET_RECIPES: "SET_RECIPES",
  SET_INGREDIENTS: "SET_INGREDIENTS"
};

const fetchRecipes = async () =>
  (await fetch("https://www.mocky.io/v2/5c85f7a1340000e50f89bd6c")).json();

const fetchIngredients = async () =>
  (await fetch("https://www.mocky.io/v2/5cac82f1300000664f10368f")).json();

export const actions = {
  setLoading: payload => ({ type: types.SET_LOADING, payload }),
  setRecipes: payload => ({ type: types.SET_RECIPES, payload }),
  setIngredients: payload => ({ type: types.SET_INGREDIENTS, payload }),
  fetch: dispatch => async () => {
    dispatch(actions.setLoading(true));
    const [{ recipes }, { ingredients }] = await Promise.all([
      fetchRecipes(),
      fetchIngredients()
    ]);
    dispatch(actions.setRecipes(recipes));
    dispatch(actions.setIngredients(ingredients));
    dispatch(actions.setLoading(false));
  }
};

export const reducer = (state, action) => {
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
