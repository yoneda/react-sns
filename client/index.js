import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import agent from "./agent";

function HelloMessage(props) {
  const { name } = props;
  const [value, setValue] = useState("");
  useEffect(()=>{
    agent.Helth.get().then(res=>{
      const val = JSON.parse(res.text);
      setValue(val.val);
    })
  },[]);
  return (
    <div>
      hello, {name}, responce value is {value}
    </div>
  );
}

ReactDOM.render(<HelloMessage name={"kohei"} />, document.getElementById("app"));
