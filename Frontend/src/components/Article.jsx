import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import "../css/article.css";

export default function Article() {
  const [article, setArticle] = useState([]);
  const [snippets, setSnippets] = useState([]);
  const [articleLoading, setArticleLoading] = useState(true);
  const [snippetsLoading, setSnippetsLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();

  const fetchArticles = async () => {
    setArticleLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/articles/article/${id}`
      );
      setArticle(response.data);
      console.log(article);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setArticleLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [id]);

  const fetchSnippets = async () => {
    setSnippetsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/snippets/`
      );
      setSnippets(response.data);
    } catch (error) {
      console.error("Error fetching snippets:", error);
    } finally {
      setSnippetsLoading(false);
    }
  };

  useEffect(() => {
    fetchSnippets();
  }, []);

  if (articleLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Navbar />
      <div className="article-page-cnt">
        <article className="article-cnt">
          <div className="article-header">
            <h1>{article.title}</h1>
          </div>
          <p className="article-date">
            {new Intl.DateTimeFormat("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }).format(new Date(article.date))}
          </p>
          <p>{article.body}</p>
        </article>
        <div className="more-articles">
          <h2>More articles</h2>
          <div className="snippets">
            {snippets.map((snippet) => (
              <Link to={`/article/${snippet.id}`} key={snippet.id}>
                <div className="snippet">
                  <p>{snippet.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
