import { useEffect, useState } from 'react';
import axios from 'axios';

const id = import.meta.env.VITE_WEATHER_API_KEY;

const useGetLocation = (zip) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [weatherData, setWeatherData] = useState({});

	const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${id}&units=imperial`;

	useEffect(() => {
		makeRequest();
	}, [zip, url]);

	const makeRequest = async () => {
		setLoading(true);
		await axios(url)
			.then((res) =>
				setWeatherData({
					location: res.data.name,
					conditions: res.data.weather[0].main,
					temp: res.data.main.temp,
				})
			)
			.catch((err) => {
				setError(err);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return { weatherData, loading, error };
};

export default useGetLocation;
