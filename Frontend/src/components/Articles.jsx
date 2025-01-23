import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/articles.css";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pageNr, setPageNr] = useState(1);

  const handleNextPage = () => {
    setPageNr((prevPage) => prevPage + 1);
  };

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/articles?page=${pageNr}`
      );
      setArticles((prevArticles) => [
        ...prevArticles,
        ...response.data.results,
      ]); // Append new articles
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [pageNr]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className="articles-cnt">
        <div className="latest-header">
          <h1>Latest Blogs</h1>
        </div>
        {articles.map((article) => (
          <div className="article-bob" key={article.id}>
            <h2>{article.title}</h2>
            <p> {`${article.body.substring(0, 100)}...`}</p>
            <p className="article-date">
              {new Intl.DateTimeFormat("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }).format(new Date(article.date))}
            </p>
          </div>
        ))}
      </div>
      {loading ? (
        <></>
      ) : (
        <button className="load-more" onClick={handleNextPage}>
          Load More
        </button>
      )}
    </div>
  );
}
