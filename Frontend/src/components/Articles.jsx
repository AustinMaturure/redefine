import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("/api/articles/")
      .then((response) => {
        setArticles(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching articles");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div>
        {articles.map((article) => (
          <div key={article.id}>
            <h2>{article.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
