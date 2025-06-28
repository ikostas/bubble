import React from 'react';
export default function Headline({article}) {
  const timestamp = article.publishedAt;
  const date = new Date(timestamp);
  return(
    <>
  <h4>{article.title}</h4>
    <p><strong>Source:</strong> <a href={article.url}>{article.source.name}</a> <strong>by</strong> {article.author} <strong>published at</strong> {date.toLocaleString()}</p>
    <p>{article.description}</p>
    </>
  )
}

