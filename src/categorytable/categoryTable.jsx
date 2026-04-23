import React from "react";
import "./categorytable.css";

const CategoryTable = ({ category, positions }) => {
  console.log(positions);
  console.log(category);

  const showDescriptionHandler = (e) => {
    e.currentTarget.nextElementSibling.classList.toggle("show-description");
  };

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
                if (i === 0 || i === 1 || i === 2) {
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
