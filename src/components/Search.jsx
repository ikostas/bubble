import React, {useState} from 'react';
function SearchBar() {
  const [searchQuery, setSearch] = useState('');
  const handleChange = e => {
    const currentQuery = e.target.value;
    setSearch(currentQuery);
  //  if(currentQuery.length > 3) setTimeout(() => search(currentQuery), 3000);
  }
  return (
    <form>
      <fieldset>
        <label htmlFor="search">Search:</label>
        <input type="text" name="search" id="search" placeholder="Search text" aria-label="Search text"
        value={searchQuery}
        onChange={handleChange} />
        <input type="submit" value="Search" />
      </fieldset>
    </form>
  )
}

export default SearchBar;

