import React from "react";
import PropTypes from "prop-types";
import fetch from "isomorphic-unfetch";
import Sub from "../components/subComponent";

const Index = ({ val }) => {
  return (
    <div>
      <Sub />
      <div> count is … {val}</div>
    </div>
  );
};

// リクエスト時にサーバーサイドでレンダリングして値を返す
Index.getInitialProps = async () => {
  const res = await fetch("http://localhost:3000/api/helth");
  const json = await res.json();
  return json;
};

export default Index;
