import React, { useEffect, useRef, useState } from "react";
import News from "./News";
import "./Newsapp.css";

function Newsapp() {
  const [newsList, setNewsList] = useState([]);
  const [query, setQuery] = useState("tesla");
  const api_Url =
    "https://newsapi.org/v2/everything?q=tesla&from=2022-12-30&sortBy=publishedAt&apiKey=1206e647427544e582844bf2a603ce61";

  const queryInputRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [query]);

  async function fetchData() {
    try {
      const response = await fetch(api_Url);
      const jsonData = await response.json();
      console.log(jsonData);
      setNewsList(jsonData.articles);
    } catch (e) {
      console.log("Error: ", e);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const queryValue = queryInputRef.current.value;
    setQuery(queryValue);
  }
  return (
    <div className="news-app">
      <h1
        style={{
          textAlign: "center",
          marginBlock: "10px",
          fontFamily: "monospace",
          fontSize: "3rem",
        }}
      >
        FIND YOUR NEWS
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          className="query-input"
          type="text"
          ref={queryInputRef}
          placeholder="Search News..."
        />
        <input
          className="btn-submit"
          onClick={handleSubmit}
          type="submit"
          value="SUBMIT"
        />
      </form>
      <hr style={{ border: "1px solid black" }} />
      <div
        style={{
          marginTop: "20px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 30%)",
          alignItems: "space-between",
          justifyContent: "space-between",
          rowGap: "20px",
        }}
      >
        {newsList.map((news) => {
          return <News key={news.url} news={news} />;
        })}
      </div>
    </div>
  );
}

export default Newsapp;
