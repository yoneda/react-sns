import React from "react";
import { Link, navigate } from "@reach/router";
import { useStoreActions } from "easy-peasy";

const backStyle = {
  width: "100%",
  height: "100%",
  position: "absolute",
  left: 0,
  top: 0,
};

function Menu(props) {
  const { closeHandler } = props;
  const logout = useStoreActions((actions) => actions.app.logout);
  const onSuccess = () => navigate("/login");
  return (
    <div>
      <div style={backStyle} onClick={() => closeHandler()}></div>
      <div style={{ position: "absolute", right: 10, top: 40 }}>
        <div
          style={{
            border: "1px solid",
            width: "100px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Link to="/">home</Link>
          <Link to="/setting">setting</Link>
          <button onClick={() => logout({ onSuccess })}>logout</button>
        </div>
      </div>
    </div>
  );
}

export default Menu;
