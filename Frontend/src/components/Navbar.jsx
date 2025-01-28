import { useState, useEffect } from "react";
import "../css/navbar.css";

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header");
      if (window.scrollY > 10) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={isSticky ? "sticky" : ""}>
      <h2 className="nav-logo">
        <a href="/">Redefine</a>
      </h2>
    </header>
  );
}
