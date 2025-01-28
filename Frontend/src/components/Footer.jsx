import "../css/footer.css";

export default function Footer() {
  return (
    <footer>
      <hr />
      <p className="copy-right">
        &copy; {new Date().getFullYear()} Redifine. All rights reserved.
        Designed and developed by{" "}
        <a
          className="austin-portfolio"
          href="https://austinmaturure.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          ⚡ Austin
        </a>
      </p>
    </footer>
  );
}
