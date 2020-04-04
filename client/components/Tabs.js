import React, { Fragment } from "react";

const TabItem = props => {
  const { title, isSelected } = props;
  if (isSelected) {
    return <span style={{ fontWeight: "bold" }}>{title}</span>;
  }
  return <span>{title}</span>;
};

export const Tabs = props => {
  const { titles, tabIndex, tabOnClick } = props;
  return (
    <div
      style={{ width: "200px", border: "1px solid", backgroundColor: "white" }}
    >
      {titles.map((title, index) => (
        <div
          key={index}
          onClick={() => tabOnClick(index)}
          style={{ cursor: "pointer" }}
        >
          <TabItem title={title} isSelected={tabIndex === index} />
          <br />
        </div>
      ))}
    </div>
  );
};
