import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import CategoryTable from "./categorytable/categoryTable";
import { Audio } from "react-loader-spinner";
import "./App.css";
import HeaderTable from "./headerTable/headerTable";
import Header from "./header/Header";

function App() {
  const [headerTable, setHeaderTable] = useState([]);
  const [positions, setPosition] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [columns] = useState([1, 2, 3]);
  const [searchPosition, setSearchPosition] = useState("");
  const url =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTLxuGZdqHNd4WOc1IUYf_U_pR8jTpELHONnZ5xOIN6hMq9YCQRMjW73q69heqFfBwdS_Z5EDwBB2tn/pub?output=csv";

  const searchHandler = (e) => {
    const stringsearch = e.target.value;
    setSearchPosition(stringsearch);
  };

  const searchPos = () => {
    // if (searchPosition.length < 3) {
    //   return positions;
    // }
    const reg = new RegExp(`${searchPosition}`, "gi");
    const objP = structuredClone(positions);
    const obj = {};

    for (let category in objP) {
      if (
        objP[`${category}`].filter((pos) => pos[1].match(reg)).flat().length !=
        0
      ) {
        obj[`${category}`] = objP[`${category}`].filter((pos) =>
          pos[1].match(reg),
        );
      }
    }
    return obj;
  };

  useEffect(() => {
    const parsing = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          setError(true);
          setLoading(false);
        }
        Papa.parse(url, {
          download: true,
          complete: (result) => {
            console.log(result);
            if (result.errors.length > 0) {
              setError(true);
              setLoading(false);
            } else {
              let headers = result.data[0];
              let objPositions = {};
              for (let i = 1; i < result.data.length; i++) {
                if (result.data[i].every((el) => el.length === 0)) continue;
                if (
                  result.data[i][0].length != 0 &&
                  result.data[i][1].length === 0
                ) {
                  objPositions[`${result.data[i][0]}`] = [];
                  continue;
                }
                objPositions[`${result.data[i][0]}`].push(result.data[i]);
              }
              setPosition(objPositions);
              setLoading(false);
              setHeaderTable(headers);
            }
          },
        });
      } catch {
        setError(true);
        setLoading(false);
      }
    };
    parsing();
  }, []);

  const needPosition = searchPos();
  console.log(needPosition);

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

  if (error) {
    return <h1>Не удалось загрузить данные попробуйте позже</h1>;
  }

  return (
    <>
      <Header />
      <div className="searchpanel">
        <input
          type="text"
          onChange={searchHandler}
          placeholder="Введите услугу или препарат"
          maxLength={15}
          id="input-search"
        />
      </div>
      <div className="container">
        <div className="table">
          <HeaderTable header={headerTable} columns={columns} />
          {Object.keys(needPosition).map((key) => {
            return (
              <React.Fragment key={key}>
                <CategoryTable
                  category={key}
                  positions={needPosition[key]}
                  columns={columns}
                />
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
