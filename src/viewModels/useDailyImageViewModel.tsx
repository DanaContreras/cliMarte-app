import {useState, useEffect} from 'react';
import {getDailyImage} from '../models/DailyImageModel';

export const useDailyImageViewModel = () => {
  const [dailyImage, setDailyImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDailyImage = async () => {
    setLoading(true);
    setError(null);

    const result = await getDailyImage();

    if (result.success) {
      setDailyImage(result.data);
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchDailyImage();
  }, []);

  return {dailyImage, loading, error, fetchDailyImage};
};
