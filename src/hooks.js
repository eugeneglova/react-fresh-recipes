import { useState, useEffect, useReducer } from "react";

import { initialState, reducer, actions } from "./reducer";

const fetchDataUrl = async url => (await fetch(url)).json();

export const useDataApi = (initUrlMap = {}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [urlMap, setUrlMap] = useState(initUrlMap);
  useEffect(() => {
    const fetechData = async () => {
      dispatch(actions.setLoading(true));
      const dataArray = await Promise.all(
        Object.keys(urlMap).map(key => fetchDataUrl(urlMap[key]))
      );
      const res = Object.keys(urlMap).reduce(
        (acc, key, urlIndex) => ({
          ...acc,
          [key]: dataArray[urlIndex]
        }),
        state.data
      );
      dispatch(actions.setLoading(false));
      dispatch(actions.setData(res));
    };
    fetechData();
  }, [urlMap]);

  return [state, setUrlMap];
};
