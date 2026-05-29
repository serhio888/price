import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import CategoryTable from "./categorytable/categoryTable";
import { Audio } from "react-loader-spinner";
import "./App.css";
import HeaderTable from "./headerTable/headerTable";
import Header from "./header/Header";
import { nanoid } from "nanoid";

function App() {
  const [headerTable, setHeaderTable] = useState([]);
  const [positions, setPosition] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchPosition, setSearchPosition] = useState("");
  const [descriptionArray, setDescriptionArray] = useState([]);
  const url =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTLxuGZdqHNd4WOc1IUYf_U_pR8jTpELHONnZ5xOIN6hMq9YCQRMjW73q69heqFfBwdS_Z5EDwBB2tn/pub?output=csv";

  const searchHandler = (e) => {
    const stringsearch = e.target.value;
    setSearchPosition(stringsearch);
  };

  const showInfoHandler = (id) => {
    if (descriptionArray.includes(id)) {
      setDescriptionArray(descriptionArray.filter((elem) => elem != id));
    } else {
      setDescriptionArray([...descriptionArray, id]);
    }
  };

  const searchPos = () => {
    const reg = new RegExp(`${searchPosition}`, "gi");
    const objP = structuredClone(positions);
    const obj = {};

    for (let category in objP) {
      if (
        objP[`${category}`]
          .filter((pos) => pos["Наименование"].match(reg))
          .flat().length != 0
      ) {
        obj[`${category}`] = objP[`${category}`].filter((pos) =>
          pos["Наименование"].match(reg),
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
          header: true,
          complete: (result) => {
            if (result.errors.length > 0) {
              setError(true);
              setLoading(false);
            } else {
              let headers = [];
              let objPositions = {};
              let name = undefined;
              Object.keys(result.data[0]).forEach((el, ind, arr) => {
                if (ind != arr.length - 1) {
                  headers.push(el);
                }
              });
              for (let i = 0; i < result.data.length; i++) {
                if (Object.values(result.data[i]).join("").length === 0)
                  continue;
                if (
                  Object.values(result.data[i])[0].length != 0 &&
                  Object.values(result.data[i])[1].length === 0
                ) {
                  name = Object.values(result.data[i])[0];
                  objPositions[`${name}`] = [];
                  continue;
                }
                let obj = result.data[i];
                obj.id = nanoid();
                objPositions[`${name}`].push(obj);
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

  if (loading) {
    return (
      <Audio
        height="100"
        width="100"
        color="#d7a66f"
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
          <HeaderTable header={headerTable} />
          {Object.keys(needPosition).map((key) => {
            return (
              <React.Fragment key={key}>
                <CategoryTable
                  category={key}
                  positions={needPosition[key]}
                  showInfo={descriptionArray}
                  descriptionHandler={showInfoHandler}
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
