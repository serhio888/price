import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import CategoryTable from "./categorytable/categoryTable";
import { Audio } from "react-loader-spinner";
import "./App.css";
import HeaderTable from "./headerTable/headerTable";
import _ from "lodash";

function App() {
  const [headerTable, setHeaderTable] = useState([]);
  const [positions, setPosition] = useState([]);
  const [loading, setLoading] = useState(true);
  const [columns] = useState([1, 2, 3]);

  const searchHandler = (e) => {
    const stringsearch = e.target.value;
    // if (stringsearch.length < 3) return;
    const reg = new RegExp(`${stringsearch}`, "gi");
    const deep = _.cloneDeep(positions);
    function searchPoint(arr) {
      return arr[1].match(reg);
    }
    for (let categ in deep) {
      deep[categ] = deep[categ].filter((pos) => searchPoint(pos));
    }
    setPosition(deep);
    console.log(deep);
  };

  useEffect(() => {
    try {
      Papa.parse(
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vTLxuGZdqHNd4WOc1IUYf_U_pR8jTpELHONnZ5xOIN6hMq9YCQRMjW73q69heqFfBwdS_Z5EDwBB2tn/pub?output=csv",
        {
          download: true,
          complete: (result) => {
            console.log(result);
            let headers = result.data[0];
            let categories = [];
            let positions = [];
            let objPositions = {};

            for (let i = 1; i < result.data.length; i++) {
              if (result.data[i].filter((elem) => elem != "").length === 1) {
                categories.push(result.data[i].filter((elem) => elem != "")[0]);
                continue;
              }
              if (result.data[i].every((elem) => elem === "")) continue;
              positions.push(result.data[i]);
            }

            for (let i = 0; i < categories.length; i++) {
              objPositions[`${categories[i]}`] = positions.filter((elem) =>
                elem.some((el) => el === `${categories[i]}`),
              );
            }

            // console.log(objPositions);
            // console.log("headers:", headers);
            // console.log("categories:", categories);
            // console.log("positions:", positions);
            setHeaderTable(headers);
            setPosition(objPositions);
            setLoading(false);
          },
        },
      );
    } catch {}
  }, []);

  if (loading) {
    return (
      <Audio
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="audio-loading"
        wrapperStyle={{}}
        wrapperClass="wrapper-class"
        visible={true}
      />
    );
  }

  return (
    <>
      <h1>Прайс лист</h1>
      <input type="text" onChange={searchHandler} />
      <div className="container">
        <div className="table">
          <HeaderTable header={headerTable} columns={columns} />
          {Object.keys(positions).map((key) => {
            return (
              <CategoryTable
                category={key}
                positions={positions[key]}
                columns={columns}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
