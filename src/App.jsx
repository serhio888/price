import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import CategoryTable from "./categorytable/categoryTable";
import { Audio } from "react-loader-spinner";
import "./App.css";
import HeaderTable from "./headerTable/headerTable";

function App() {
  const [headerTable, setHeaderTable] = useState([]);
  const [positions, setPosition] = useState([]);
  const [loading, setLoading] = useState(true);
  const [columns] = useState([1, 2, 3]);
  const [searchPosition, setSearchPosition] = useState("");

  // const searchHandler = (e) => {
  //   const str = e.target.value;

  //   const searchPosition = positions.filter((pos) => {
  //     pos[0].indexOf(str) !== -1;
  //   });
  //   const searchCategory = categories.filter((cat) => cat.indexOf(str) !== -1);
  //   setPosition(searchPosition);
  // };

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

            console.log(objPositions);
            console.log("headers:", headers);
            console.log("categories:", categories);
            console.log("positions:", positions);
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
      {/* <input type="text" onChange={searchHandler} /> */}
      <div className="container">
        <div className="table">
          <HeaderTable header={headerTable} columns={columns} />
          {/* {categories.map((el, i) => {
            let pos = [];
            positions.forEach((p) => {
              console.log(p);
              if (p[3] === el) {
                pos.push(p);
              }
            });
            return (
              <React.Fragment key={i}>
                <CategoryTable category={el} positions={pos} />
              </React.Fragment>
            );
          })} */}
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
