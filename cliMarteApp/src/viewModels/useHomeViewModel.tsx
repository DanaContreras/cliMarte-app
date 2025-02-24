import React, { useEffect, useState } from 'react';
import { getWeatherToday } from '../models/WeatherlModel';

export const useWeatherHomeViewModel = () => {

	const [weatherToday, setWeatherToday] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadWeatherToday();
  }, []);

	const loadWeatherToday = async () => {
		try {
			setLoading(true);
			const response = await getWeatherToday();
			if (response.success)
				setWeatherToday(response.data);
			setLoading(false);
		} catch (error) {
			console.error('Error al obtener el clima actual: ', error);
		}
	}

	return {
		weatherToday,
		loading,
		loadWeatherToday
	};
};
