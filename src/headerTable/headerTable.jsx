import React from "react";
import "./headertable.css";

const HeaderTable = ({ header, columns }) => {
  return (
    <div className="tableheader">
      {header.map((name, index) => {
        if (columns.some((el) => el === index)) {
          return (
            <div key={index}>
              <span>{name}</span>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default HeaderTable;
