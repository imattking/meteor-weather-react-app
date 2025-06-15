import React from 'react';
import { useEffect, useState } from 'react';

const id = import.meta.env.VITE_WEATHER_API_KEY;

const useGetLocation = (zip) => {
	const [isLoading, setIsLoading] = useState(true);
	const [weatherData, setWeatherData] = useState({});

	if (zip && zip.length === 5) {
		const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${id}&units=imperial`;

		useEffect(() => {
			fetch(url)
				.then((res) => res.json())
				.then((data) => {
					if (data.cod === '404') {
						setWeatherData({
							code: '404',
							location: 'Invalid zip code',
						});
						setIsLoading(false);
					} else {
						console.log(data);
						setWeatherData({
							location: data.name,
							conditions: data.weather[0].main,
							temp: data.main.temp,
						});
						setIsLoading(false);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}, []);
	}

	return { weatherData, isLoading };
};

export default useGetLocation;
