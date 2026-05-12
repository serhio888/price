import React from "react";
import "./categorytable.css";
import down from "../assets/down.png";

const CategoryTable = ({ positions, category, columns }) => {
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
                if (columns.some((el) => el === i)) {
                  if (i === 1) {
                    return (
                      <React.Fragment key={i}>
                        <div className="position-name">
                          <span className="down">
                            <img src={down} alt="down" />
                          </span>
                          <span className="name">{elem}</span>
                        </div>
                      </React.Fragment>
                    );
                  }
                  return (
                    <div className="unit_price">
                      <span>{elem}</span>
                    </div>
                  );
                }
              })}
            </div>
            <div className="description">
              <p>{pos.at(-1)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryTable;
