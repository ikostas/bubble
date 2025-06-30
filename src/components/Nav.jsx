import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Headlines from './Headlines';
import TagCloud from './TagCloud';
import SearchNews from './SearchNews';

export default function NavBar(){
  return (
    <Router>
  <nav>
    <ul>
      <li><Link to="/">Top Headlines</Link></li>
      <li><Link to="/tagcloud">Tag Cloud</Link></li>
      <li><Link to="/searchthenews">Search the News</Link></li>
    </ul>
  </nav>
      <Routes>
        <Route path="/" element={<Headlines />}></Route>
        <Route path="/tagcloud" element={<TagCloud />}></Route>
        <Route path="/searchthenews" element={<SearchNews />}></Route>
      </Routes>
    </Router>
  )
}
