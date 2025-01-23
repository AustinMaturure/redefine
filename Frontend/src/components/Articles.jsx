import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/articles.css";
import { Link } from "react-router-dom";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pageNr, setPageNr] = useState(1);

  const handleNextPage = () => {
    setPageNr((prevPage) => prevPage + 1);
  };
  useEffect(() => {
    let isMounted = true;

    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/articles?page=${pageNr}`
        );
        if (isMounted) {
          setArticles((prevArticles) => [
            ...prevArticles,
            ...response.data.results,
          ]);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
        if (isMounted) setError("Failed to fetch articles");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchArticles();

    return () => {
      isMounted = false;
    };
  }, [pageNr]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className="articles-cnt">
        {articles.map((article) => (
          <Link to={`/article/${article.id}`} key={article.id}>
            <div className="article-bob">
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
          </Link>
        ))}
      </div>
      {loading ? (
        <></>
      ) : (
        <button
          className="load-more"
          onClick={() => {
            handleNextPage();
          }}
        >
          Load More
        </button>
      )}
    </div>
  );
}
