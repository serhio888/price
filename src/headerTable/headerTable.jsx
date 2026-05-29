import React from "react";
import "./headertable.css";

const HeaderTable = ({ header }) => {
  return (
    <div className="tableheader">
      {header.map((name, index) => {
        if (index === 0) {
          return <div key={index}></div>;
        }
        return (
          <div key={index}>
            <span>{name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default HeaderTable;
