import {useEffect, useState} from 'react';
import {getLatestSol, getWeatherInRange} from '../models/WeatherlModel';

export const useHistorialViewModel = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (page === 0) loadInitialWeatherData();
  }, []);

  const loadInitialWeatherData = async () => {
    setLoading(true);
    const response = await getLatestSol();
    if (response.success) {
      setPage(response.data);
    } else {
      setHasMore(false);
      setLoading(false);
    }
    setLoading(false);
  };

  const loadMoreWeatherData = async () => {
    setLoading(true);
    const responseData = await getWeatherInRange(page - 3, page);
    if (responseData.success) {
      const newWeatherData = responseData.data;
      if (newWeatherData.length > 0) {
        setWeatherData(prevData => [...prevData, ...newWeatherData]);
        setPage(prevPage => prevPage - 4);
      } else setHasMore(false);
    } else {
      setHasMore(false);
    }
    setLoading(false);
  };

  return {weatherData, loading, loadMoreWeatherData, hasMore};
};
