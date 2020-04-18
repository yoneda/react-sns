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

function LandingHeader(props) {
  return (
    <Fragment>
      <div style={{ display: "flex" }}>
        <h2>Simple Diary</h2>
        <div style={{ marginLeft: "auto" }}>
          <Menu />
        </div>
      </div>
    </Fragment>
  );
}

export default LandingHeader;
