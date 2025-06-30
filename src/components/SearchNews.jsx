import React, {useState} from 'react';
import Headlines from './Headlines.jsx';

export default function SearchNews() {
  const [searchQuery, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchClick = async e => {
    e.preventDefault();
    if(searchQuery.length > 3) {
      await search(searchQuery);
    } else {
      alert("The search query should be at least 4 symbols!");
    }
  }
  function oneMonthAgo() {
    // on free plan we can search only 1 month deep with 24h delay, so it's excessive
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    currentDate.setMonth(currentMonth - 1);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  const search = async query => {
    const url = 'https://newsapi.org/v2/everything';
    const searchParams = new URLSearchParams();
    searchParams.append('q', query);
    searchParams.append('searchIn', 'title');
    searchParams.append('language', 'en');
    searchParams.append('sortBy', 'relevancy');
    searchParams.append('pageSize', '10');
    searchParams.append('page', '1');
    searchParams.append('from', oneMonthAgo());
    const searchUrl = url + '?' + searchParams.toString();
    try {
      const response = await fetch(searchUrl , { method: 'GET',
        headers: {
          'Authorization': import.meta.env.VITE_API_KEY,
        }
      });

      if (!response.status === 'ok') {
        const errorData = await response.json();
        throw new Error(errorData.error_description || `HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data && data.articles && Array.isArray(data.articles)) {
        setSearchResults(data.articles);
      } else {
        console.warn("News API response did not contain expected track data structure.");
      }
    } catch (err) {
      console.error('Error quering News API:', err);
    }
  }
  return(
    <>
      <h1>Search the News</h1>
      <form>
        <fieldset>
          <label htmlFor="search">Search:</label>
          <input type="text" name="search" id="search" placeholder="Search text" aria-label="Search text"
            value={searchQuery}
            onChange={e => setSearch(e.target.value)} />
          <input type="submit" value="Search" onClick={handleSearchClick}/>
        </fieldset>
      </form>
      <Headlines data={searchResults}/>
    </>
  )
}
