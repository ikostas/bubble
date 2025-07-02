import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNews } from './topSlice';
import {
  extract,
  distinct,
  scoreWordFrequency,
  sortByScore,
  keywordLengthFilter,
  extractKeyPhrases,
  extractAdjoinedKeyPhrases
} from '@shopping24/rake-js';

export default function TagCloud () {
  const [keywords, setKeywords] = useState([]);
  const {topNews, error, isLoading, isError} = useSelector(state => state.topNews);
  const dispatch = useDispatch();
  useEffect(() => { dispatch(getNews());}, [] );
  useEffect(() => {
    let extractedKeywords = [];
    if (!isLoading && !isError && topNews && topNews.length > 0 && keywords.length === 0) {
    let newsCombined = '';
    topNews.forEach(article => newsCombined += article.description + ' ');
     try {
        const { result } = extract(newsCombined)
        .setOptions({
          articles: newsCombined,
       //   stopWords: stopwords,
          separator: ' ',
        })
          .pipe(extractKeyPhrases)
          .pipe(extractAdjoinedKeyPhrases)
          .pipe(keywordLengthFilter)
          .pipe(distinct)
          .pipe(scoreWordFrequency)
          .pipe(sortByScore);


        extractedKeywords = result;
      } catch (e) {
          console.error("Error during RAKE extraction:", e);
          extractedKeywords = [];
      }

      setKeywords(extractedKeywords);
    }

  }, [topNews]);
  return(
    <>
      <h2>Tag Cloud</h2>
      {isLoading ? (
        <p>Loading tags...</p>
      ) : isError ? (
          <p>Error: {error}</p>
        ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', maxWidth: '800px', margin: '20px auto' }}>
              {keywords.length > 0 ? (
                keywords.map((keyword, index) => (
                  <span
                    key={index}
                    style={{
                      fontSize: `${12 + keyword.score * 0.5}px`, // Example: scale font size by score
                      padding: '5px 10px',
                      margin: '5px',
                      backgroundColor: '#e0e0e0',
                      borderRadius: '5px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {keyword.phrase} {keyword.score.toFixed(2)}
                  </span>
                ))
              ) : (
                  <p>No keywords extracted.</p>
                )}
            </div>
      )}
    </>
  )
}
