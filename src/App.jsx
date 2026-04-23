import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import CategoryTable from "./categorytable/categoryTable";
import { Audio } from "react-loader-spinner";
import "./App.css";

function App() {
  const [headers, setHeaders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [positions, setPosition] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      Papa.parse(
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vTLxuGZdqHNd4WOc1IUYf_U_pR8jTpELHONnZ5xOIN6hMq9YCQRMjW73q69heqFfBwdS_Z5EDwBB2tn/pub?output=csv",
        {
          download: true,
          complete: (result) => {
            let headers = [];
            let categories = [];
            let positions = [];
            result.data.forEach((el, i) => {
              if (i === 0) {
                headers.push(el);
                return;
              }
              if (el[0].length > 0 && el[1].length === 0) {
                categories.push(el[0]);
              }
              if (el[4]) {
                positions.push(el);
              }
            });
            console.log(result);
            console.log("headers:", headers.flat());
            console.log("categories:", categories);
            console.log("positions:", positions);
            setHeaders(headers.flat());
            setCategories(categories);
            setPosition(positions);
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
      <div className="container">
        <div className="table">
          <div className="tableheader">
            {headers.map((el, i) => {
              if (i + 1 === headers.length || i === headers.length - 2)
                return null;
              return (
                <div key={i}>
                  <span>{el}</span>
                </div>
              );
            })}
          </div>
          {categories.map((el, i) => {
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
          })}
        </div>
      </div>
    </>
  );
}

export default App;
