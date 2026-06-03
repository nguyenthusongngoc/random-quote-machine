import { useState, useCallback } from "react";
import type { Quote } from "../data/quotes";
import quotes from "../data/quotes";

const colors = [
  "#16a085",
  "#27ae60",
  "#2c3e50",
  "#f39c12",
  "#e74c3c",
  "#9b59b6",
  "#fb6964",
  "#342224",
  "#472e32",
  "#bdbb99",
  "#77b1a9",
  "#73a857",
  "#0c5e47",
  "#5a6978",
  "#2d545e",
  "#c89f5e",
  "#8e44ad",
  "#2980b9",
  "#c0392b",
  "#1abc9c",
];

function getRandomIndex(excludeIndex: number): number {
  let newIndex: number;
  do {
    newIndex = Math.floor(Math.random() * quotes.length);
  } while (newIndex === excludeIndex && quotes.length > 1);
  return newIndex;
}

function QuoteBox() {
  const [currentIndex, setCurrentIndex] = useState<number>(() =>
    Math.floor(Math.random() * quotes.length)
  );
  const [colorIndex, setColorIndex] = useState<number>(() =>
    Math.floor(Math.random() * colors.length)
  );
  const [animate, setAnimate] = useState(true);

  const quote: Quote = quotes[currentIndex];
  const color = colors[colorIndex];

  const getNewQuote = useCallback(() => {
    setAnimate(false);

    setTimeout(() => {
      setCurrentIndex((prev) => getRandomIndex(prev));
      setColorIndex(Math.floor(Math.random() * colors.length));
      setAnimate(true);
    }, 500);
  }, []);

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `"${quote.text}" — ${quote.author}`
  )}`;

  return (
    <>
      {/* CSS custom property for dynamic color */}
      <style>{`
        :root {
          --accent-color: ${color};
        }
        body {
          background-color: ${color};
          transition: background-color 1s ease;
        }
      `}</style>

      <div id="quote-box" className={animate ? "fade-in" : "fade-out"}>
        <div className="quote-content">
          <p id="text" style={{ color }}>
            <span className="quote-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="32"
                height="32"
              >
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.71 11 13.166 11 15c0 1.933-1.567 3.5-3.5 3.5-1.271 0-2.458-.593-2.917-1.179zM15.583 17.321C14.553 16.227 14 15 14 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C20.591 11.71 22 13.166 22 15c0 1.933-1.567 3.5-3.5 3.5-1.271 0-2.458-.593-2.917-1.179z" />
              </svg>
            </span>{" "}
            {quote.text}
          </p>
          <p id="author" style={{ color }}>
            — {quote.author}
          </p>
        </div>

        <div className="quote-actions">
          <a
            id="tweet-quote"
            href={tweetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-icon"
            style={{ backgroundColor: color }}
            title="Tweet this quote"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="20"
              height="20"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <button
            id="new-quote"
            className="btn btn-primary"
            onClick={getNewQuote}
            style={{ backgroundColor: color }}
          >
            New Quote
          </button>
        </div>
      </div>
    </>
  );
}

export default QuoteBox;
