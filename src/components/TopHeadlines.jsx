import React from 'react';
import {articles} from '../mockdata.js';
import Headline from './Headline';

export default function TopHeadlines(){
  return(
    <>
  <h3>Top Headlines</h3>
    {articles.slice(0,10).map((article, index) => (
      <Headline key={index} article={article}/>
    ))}
    </>
  )
}
