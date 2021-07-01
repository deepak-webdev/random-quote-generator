import "./App.css";
import React from "react";

const api_url =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
class App extends React.Component {
  state = {
    quotes: [
      {
        quote:
          "Life isn’t about getting and having, it’s about giving and being.",
        author: "Kevin Kruse",
      },
    ],
    index: 0,
  };

  componentDidMount() {
    fetch(api_url)
      .then((res) => res.json())
      .then((data) => {
        this.setState(
          {
            quotes: data.quotes,
          },
          this.getRandomIndex
        );
      });
  }

  getRandomIndex = () => {
    const { quotes } = this.state;
    if (quotes.length > 0) {
      const index = Math.floor(Math.random() * quotes.length);
      this.setState({
        index,
      });
    }
  };

  render() {
    const { quotes, index } = this.state;
    const quote = quotes[index];
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quote.quote} -${quote.author}`;
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="col-6 p-4 quote-container rounded" id="quote-box">
          {quote && (
            <div className="mb-3">
              <p id="text" className="fs-3 fw-bold">
                <i class="fa fa-quote-left "></i>
                {quote.quote}
              </p>
              <cite id="author" className="d-block quote-author fw-bold">
                -{quote.author}
              </cite>
            </div>
          )}

          <div className="d-flex justify-content-between">
            <a
              className="btn"
              href={tweetUrl}
              target="_blank"
              rel="noreferrer"
              id="tweet-quote"
            >
              <i className="fa fa-twitter"></i>
            </a>
            <button
              className="btn"
              onClick={this.getRandomIndex}
              id="new-quote"
            >
              New Quote
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
