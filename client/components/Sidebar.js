import React, { useState, Fragment, useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

function Sidebar() {
  const index = useStoreState((state) => state.app.indexSidebar);
  const updateIndex = useStoreActions((actions) => actions.app.updateIndex);
  return (
    <div>
      <button onClick={() => updateIndex(0)}>home</button>
      <button onClick={() => updateIndex(1)}>setting</button>
      <button onClick={() => updateIndex(2)}>trash</button>
    </div>
  );
}

export default Sidebar;
