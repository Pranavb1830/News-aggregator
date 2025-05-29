'use client';
import { useEffect, useState } from "react";

export default function Homepage() {
    const [articles, setArticles] = useState([]); 
    const [category, setCategory] = useState('general');

    useEffect(() => {
        fetch(`/api/news?category=${category}`)
        .then(res => res.json())
        .then(data => {
            console.log("Fetched Articles:", data); // For debugging
            setArticles(data.articles || []);
        })
        .catch(err => {
            console.error("Error fetching articles:", err);
        });
    }, [category]);

    return (
        <main className="news-container">
          <h1 className="news-heading">News Articles</h1>
          <select className="dropdown" onChange={(e) => setCategory(e.target.value)} value={category}>
            <option value="general">General</option>
            <option value="business">Business</option>
            <option value="entertainment">Entertainment</option>
            <option value="health">Health</option>
            <option value="science">Science</option>
            <option value="sports">Sports</option>
            <option value="technology">Technology</option>
          </select>
      
          <ul className="articles-list">
            {articles.map((article, index) => (
              <li key={index} className="news-item">
                <h2>
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    {article.title}
                  </a>
                </h2>
                <p>{article.description}</p>
                {article.urlToImage && (
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    <img src={article.urlToImage} alt={article.title} width="300" />
                  </a>
                )}
              </li>
            ))}
          </ul>
        </main>
      );      
}
