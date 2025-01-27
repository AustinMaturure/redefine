import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import "../css/article.css";
import ReactMarkdown from "react-markdown";
import eye from "../assets/eye.svg";
import heart from "../assets/heart.svg";

export default function Article() {
  const [article, setArticle] = useState([]);
  const [snippets, setSnippets] = useState([]);
  const [articleLoading, setArticleLoading] = useState(true);
  const [snippetsLoading, setSnippetsLoading] = useState(true);
  const [error, setError] = useState("");
  const [like, setLike] = useState(0);
  const { slug } = useParams();

  const fetchArticles = async () => {
    setArticleLoading(true);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/articles/article/${slug}`
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
    setLike(0);
  }, [slug]);

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

  const incLike = async () => {
    if (like == 0) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/article/like/${slug}`
        );
      } catch (error) {
        console.error("Error liking article:", error);
      }
      setLike(1);
    }
  };

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
          <ReactMarkdown className={"article-body"}>
            {article.body}
          </ReactMarkdown>{" "}
          <p className="end-txt">End.</p>
          <div className="likes-div">
            <svg
              className="like-svg"
              width="64px"
              height="64px"
              viewBox="-17.28 -17.28 58.56 58.56"
              fill="red"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#f66d7e"
              strokeWidth="2.4"
              onClick={() => incLike()}
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
                  fill="transparent"
                />
              </g>
            </svg>{" "}
            <p>{article.likes + like}</p>
          </div>
        </article>

        <div className="more-articles">
          <h2>More Blogs</h2>
          <div className="snippets">
            {snippets.map((snippet) => (
              <Link to={`/article/${snippet.slug}`} key={snippet.id}>
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
