import React from "react";
import { connect } from "react-redux";
import { selectors, operations } from "./../modules";

const mapStateToProps = state => ({
  count: selectors.getCount(state),
});

const mapDispatchToProps = dispatch => ({
  addHandler: () => operations.addCount(dispatch),
  subHandler: () => operations.subCount(dispatch),
  resetHandler: () => operations.resetCount(dispatch),
});

const MainContainer = ({count, addHandler, subHandler, resetHandler}) => {
  return (
    <div>
      <div>counter app</div>
      <div>
        <div>value: {count}</div>
        <button onClick={()=>addHandler()}>+</button>
        <button onClick={()=>subHandler()}>-</button>
        <button onClick={()=>resetHandler()}>reset</button>
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer);
