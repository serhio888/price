import React from "react";
import "./categorytable.css";
import Position from "../position/Position";

const CategoryTable = ({
  positions,
  category,
  showInfo,
  descriptionHandler,
}) => {
  return (
    <div className="categorytable">
      <div className="category">
        <p>{category}</p>
      </div>

      {positions.map((el, index) => {
        return (
          <React.Fragment key={index}>
            <Position
              position={el}
              showInfo={showInfo}
              descriptionHandler={descriptionHandler}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default CategoryTable;
