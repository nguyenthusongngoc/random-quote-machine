import QuoteBox from "./components/QuoteBox";

function App() {
  return (
    <div className="app-wrapper">
      <QuoteBox />
      <footer className="footer">
        <p>
          by{" "}
          <a
            href="https://github.com/nguyenthusongngoc"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ngoc Nguyen
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
