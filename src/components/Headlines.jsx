import React from 'react';
import Headline from './Headline';

export default function Headlines({data}){
  if(!data || data.length === 0) return <h3>No headlines!</h3>;
  return(
    <>
    {data.map((article, index) => (
      <Headline key={index} article={article}/>
    ))}
    </>
  )
}
