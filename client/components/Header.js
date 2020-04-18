import React, { Fragment } from "react";
import { Link } from "@reach/router";

function Menu() {
  return (
    <ul>
      <li>
        <Link to="/login">login</Link>
      </li>
      <li>
        <Link to="/signup">signup</Link>
      </li>
    </ul>
  );
}

function Header(props) {
  const { children } = props;
  return (
    <Fragment>
      <div style={{ display: "flex" }}>
        <h2>Simple Diary</h2>
        <div style={{ marginLeft: "auto" }}>
          {children}
        </div>
      </div>
    </Fragment>
  );
}

export default Header;
