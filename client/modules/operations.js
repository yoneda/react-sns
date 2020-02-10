import * as actions from "./actions";

const addCount = dispatch => {
  dispatch(actions.getAddCount());
}

const subCount = dispatch => {
  dispatch(actions.getSubCount());
}

const resetCount = dispatch => {
  dispatch(actions.getResetCount());
}

export { addCount, subCount, resetCount };