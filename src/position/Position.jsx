import React from "react";
import down from "../assets/down.png";
import up from "../assets/up.png";

const Position = ({ position, showInfo, descriptionHandler }) => {
  let arrow = showInfo.includes(position.id);

  return (
    <div className="position">
      <div
        className="position-info"
        onClick={() => descriptionHandler(position.id)}
      >
        <div className="position-name">
          {arrow ? (
            <span className="up">
              <img src={up} alt="up" />
            </span>
          ) : (
            <span className="down">
              <img src={down} alt="down" />
            </span>
          )}
          <span className="name">{position["Наименование"]}</span>
        </div>
        <div className="unit_price">
          <span>{position["Ед. измерения"]}</span>
        </div>
        <div className="unit_price">
          <span>{position["цена, ₽"]}</span>
        </div>
      </div>
      {arrow ? (
        <div className="description">
          <p>{position["Описание"]}</p>
        </div>
      ) : null}
    </div>
  );
};

export default Position;
