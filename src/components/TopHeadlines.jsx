import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNews } from './topSlice';
import Headlines from './Headlines.jsx';

export default function TopHeadlines() {
  const {topNews, error, isLoading, isError} = useSelector(state => state.topNews);
  const dispatch = useDispatch();
  useEffect(() => { dispatch(getNews()) }, []);
  // console.log(topNews);
  return(
    <>
      <h2>Top News in Technology</h2>
      {isLoading ? (
        <p>Loading news...</p>
      ) : isError ? (
        <p>Error: {error}</p>
      ) : (
        <Headlines data={topNews} />
      )}
    </>
  )
}
