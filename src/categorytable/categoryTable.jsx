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

      {/* {positions.map((pos, ind) => {
        return (
          <div className="position" key={ind + 100}>
            <div
              className="position-info"
              onClick={() => showDescriptionHandler(`${index}${ind}`)}
            >
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
                    <div className="unit_price" key={i + 34}>
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
      })} */}
    </div>
  );
};

export default CategoryTable;
