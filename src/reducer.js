export const initialState = {
  loading: false,
  data: {}
};

const types = {
  SET_LOADING: "SET_LOADING",
  SET_DATA: "SET_DATA"
};

export const actions = {
  setLoading: payload => ({ type: types.SET_LOADING, payload }),
  setData: payload => ({ type: types.SET_DATA, payload })
};

export const reducer = (state, action) => {
  switch (action.type) {
    case types.SET_LOADING: {
      const { payload: loading } = action;
      return { ...state, loading };
    }

    case types.SET_DATA: {
      const { payload: data } = action;
      return { ...state, loading: false, data };
    }

    default: {
      return state;
    }
  }
};
