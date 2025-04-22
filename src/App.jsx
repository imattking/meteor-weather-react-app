import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Form from '../components/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { faCloudRain } from '@fortawesome/free-solid-svg-icons';
import { faCloudShowersHeavy } from '@fortawesome/free-solid-svg-icons';
import { faCloudBolt } from '@fortawesome/free-solid-svg-icons';
import { faSnowflake } from '@fortawesome/free-solid-svg-icons';
import { faSmog } from '@fortawesome/free-solid-svg-icons';

const App = () => {
	const id = import.meta.env.VITE_WEATHER_API_KEY;

	const [darkMode, setDarkMode] = useState(
		() => JSON.parse(localStorage.getItem('mode')) || false
	);

	React.useEffect(() => {
		localStorage.setItem('mode', JSON.stringify(darkMode));
	}, [darkMode]);

	const [zip, setZip] = useState('');

	const [weather, setWeather] = useState({
		// location: "",
		// conditions: "",
		// code: "",
		// temp: "",
	});

	const [display, setDisplay] = useState(false);

	const handleChange = (e) => {
		const { value } = e.target;
		setZip(value);
		setDisplay(false);
		setWeather({});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (zip.length !== 5) {
			alert('Please enter 5 digit zip code');
			setDisplay(false);
		} else {
			setDisplay(true);
		}
	};

	const toggle = () => {
		setDarkMode((prevMode) => !prevMode);
	};

	React.useEffect(() => {
		if (zip && zip.length === 5) {
			const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${id}&units=imperial`;
			fetch(url)
				.then((res) => res.json())
				.then((data) => {
					//console.log(data);
					//console.log(data.weather[0].main)
					if (data.cod === '404') {
						setWeather({
							// ...prevWeather,
							code: '404',
							location: 'Invalid zip code',
							//conditions: "",
							//temp: ""
						});
					} else {
						setWeather({
							location: data.name,
							conditions: data.weather[0].main,
							temp: data.main.temp,
						});
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [display]);

	// Set Weather Icon based on conditions

	let date = new Date();
	let hour = date.getHours();

	let weatherIcon;
	if (!weather) {
		weatherIcon = '';
	} else if (weather.conditions === 'Clear') {
		if (hour && hour < 20 && hour > 6)
			weatherIcon = <FontAwesomeIcon className="weather--icon" icon={faSun} />;
		else {
			weatherIcon = <FontAwesomeIcon className="weather--icon" icon={faMoon} />;
		}
	} else if (weather.conditions === 'Clouds') {
		weatherIcon = <FontAwesomeIcon className="weather--icon" icon={faCloud} />;
	} else if (weather.conditions === 'Drizzle') {
		weatherIcon = (
			<FontAwesomeIcon className="weather--icon" icon={faCloudRain} />
		);
	} else if (weather.conditions === 'Rain') {
		weatherIcon = (
			<FontAwesomeIcon className="weather--icon" icon={faCloudShowersHeavy} />
		);
	} else if (weather.conditions === 'Thunderstorm') {
		weatherIcon = (
			<FontAwesomeIcon className="weather--icon" icon={faCloudBolt} />
		);
	} else if (weather.conditions === 'Snow') {
		weatherIcon = (
			<FontAwesomeIcon className="weather--icon" icon={faSnowflake} />
		);
	} else {
		weatherIcon = <FontAwesomeIcon className="weather--icon" icon={faSmog} />;
	}

	return (
		<>
			<div className={darkMode ? 'container dark' : 'container'}>
				<Navbar darkMode={darkMode} toggle={toggle} />
				<Form
					darkMode={darkMode}
					handleChange={handleChange}
					handleSubmit={handleSubmit}
					value={zip}
				/>
				{display && (
					<div className="results">
						<h2 className="weather--location">{weather.location} </h2>
						<div className="results--wrapper">
							<div className="conditions--wrapper">
								{!weather.code && weatherIcon}
								<p className="weather--conditions">
									{!weather.code && weather.conditions}
								</p>
							</div>
							<h3 className="weather--temp">
								{!weather.code && weather.temp && Math.round(weather.temp)}
								{!weather.code && `º`}
							</h3>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default App;
