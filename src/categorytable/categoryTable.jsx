import React from "react";
import "./categorytable.css";

const CategoryTable = ({ positions, category, columns }) => {
  const showDescriptionHandler = (e) => {
    e.currentTarget.nextElementSibling.classList.toggle("show-description");
  };

  // console.log(positions);

  return (
    <div className="categorytable">
      <div className="category">
        <p>{category}</p>
      </div>

      {positions.map((pos, i) => {
        return (
          <div className="position" key={i + 100}>
            <div className="position-info" onClick={showDescriptionHandler}>
              {pos.map((elem, i) => {
                if (columns.some((el) => el === i)) {
                  return (
                    <div className="" key={i}>
                      {elem}
                    </div>
                  );
                }
              })}
            </div>
            <div className="description">
              <p>{pos.pop()}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryTable;
