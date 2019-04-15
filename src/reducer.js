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

export const actions = {
  setLoading: payload => ({ type: types.SET_LOADING, payload }),
  setRecipes: payload => ({ type: types.SET_RECIPES, payload }),
  setIngredients: payload => ({ type: types.SET_INGREDIENTS, payload })
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
