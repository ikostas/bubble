import React, {useState, useEffect} from 'react';
import Headline from './Headline';

export default function Headlines({data}){
  if(!data || data.length === 0) return <h3>No headlines!</h3>;
  return(
    <>
  <h3>Headlines</h3>
    {data.map((article, index) => (
      <Headline key={index} article={article}/>
    ))}
    </>
  )
}
