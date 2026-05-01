import React from "react";
import "./categorytable.css";
import _ from "lodash";

const CategoryTable = ({ positions, category, columns, search }) => {
  const showDescriptionHandler = (e) => {
    e.currentTarget.nextElementSibling.classList.toggle("show-description");
  };

  console.log(positions);

  function needPosition() {
    if (search.length < 3) return positions;
    const reg = new RegExp(`${search}`, "gi");
    const deep = structuredClone(positions);
    console.log(deep);
    const aaa = deep.filter((pos) => pos[1].match(reg));
    console.log(aaa);
    return aaa;
  }

  const searchPos = needPosition();

  return (
    <div className="categorytable">
      <div className="category">
        <p>{category}</p>
      </div>

      {searchPos.map((pos, i) => {
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
              <p>{pos.at(-1)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryTable;
