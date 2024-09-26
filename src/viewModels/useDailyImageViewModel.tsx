import {useState, useEffect} from 'react';
import {getDailyImage} from '../models/DailyImageModel';

export const useDailyImageViewModel = () => {
  const [dailyImage, setDailyImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [warning, setWarning] = useState(null);

  const fetchDailyImage = async () => {
    setLoading(true);
    setError(null);
    setWarning(null);

    const result = await getDailyImage();

    if (result.success) {
      setDailyImage(result.data);
      if (result.warning)
        setWarning(result.warning);
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchDailyImage();
  }, []);

  return {dailyImage, loading, error, warning, fetchDailyImage};
};
