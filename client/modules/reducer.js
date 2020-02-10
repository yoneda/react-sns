import * as types from "./types";

export const initialState = {
  count: 0
};

const reducer = (state = initialState, action) => {
  if (action.type === types.ADD_COUNT) {
    return { ...state, count: state.count + 1 };
  } else if (action.type === types.SUB_COUNT) {
    return { ...state, count: state.count - 1 };
  } else if (action.type === types.RESET_COUNT) {
    return { ...state, count: 0 };
  } else {
    return initialState;
  }
};

export default reducer;