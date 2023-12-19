import { useEffect, useState } from "react";
import "./App.css";
import NewsCard from "./components/NewsCard";

function App() {

// simple variables
  const [query, setQuery] = useState();
  const [data, setData] = useState([]);


// accessing .env variables
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = import.meta.env.VITE_API_URL;


//  fetching data from api
  const getNews = async (query) => {
    try {
      const res = await fetch(`${apiUrl}${query}&apikey=${apiKey}`);
      const a = await res.json();
      setData(a.articles);
    } catch (error) {
      console.log("cannot get news", error);
    }
  };


// default data loading  
  useEffect(() => {
    getNews('india');
  }, [query]);


// handling search results
  const handleSearch = () => {
    setData([])
    getNews(query);
  }
  const handleSearchOnEnter = (e) => {
    if (e.key === 'Enter'){
      getNews(query);
    }
  }


  return (
    <>
    // nav - section
      <header>
        <nav>
          <a
            href="/"
            onClick={() => window.location.reload()}
          >
            <h2>AIO News</h2>
          </a>

          <ul id="nav-item">
            <li>
              <a
                onClick={() => getNews("business")}
                href="#"
              >
                Business
              </a>
            </li>
            <li>
              <a
                onClick={() => getNews("politics")}
                href="#"
              >
                Politics
              </a>
            </li>
            <li>
              <a
                onClick={() => getNews("entertainment")}
                href="#"
              >
                Entertainment
              </a>
            </li>
            <li>
              <a
                onClick={() => getNews("cricket")}
                href="#"
              >
                Cricket
              </a>
            </li>
          </ul>

          <div className="search-box">
            <input 
            type="text" 
            placeholder="e.g. Space" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearchOnEnter}
            />
            <button 
            className="p-btn"
            onClick={handleSearch}
            >
              Search
            </button>
            <button 
            onClick={handleSearch}
            className="s-btn">
            <i className="ri-search-line"></i>
            </button>
          </div>
        </nav>
      </header>
    // feed -section
      <div className="feed">
        {data
          .filter((item) => item.urlToImage)
          .map((item, i) => (
            <NewsCard
              key={i}
              url={item.url}
              title={item.title}
              imgurl={item.urlToImage}
              sourceName={item.source.name}
              desc={item.description}
            />
          ))}
      </div>
    </>
  );
}

export default App;
