import React, { useEffect, useState } from 'react';
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
import useGetLocation from '../util/hooks/useGetLocation';

const App = () => {
	const [darkMode, setDarkMode] = useState(
		() => JSON.parse(localStorage.getItem('mode')) || false
	);

	React.useEffect(() => {
		localStorage.setItem('mode', JSON.stringify(darkMode));
	}, [darkMode]);

	const [zip, setZip] = useState('30605');
	const { weatherData, isLoading } = useGetLocation(zip);

	const handleChange = (e) => {
		const { value } = e.target;
		setZip(value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (zip.length !== 5) {
			alert('Please enter 5 digit zip code');
		} else {
			//
		}
	};

	const toggle = () => {
		setDarkMode((prevMode) => !prevMode);
	};

	// Set Weather Icon based on conditions

	let date = new Date();
	let hour = date.getHours();

	let weatherIcon;
	if (!weatherData) {
		weatherIcon = '';
	} else if (weatherData.conditions === 'Clear') {
		if (hour && hour < 20 && hour > 6)
			weatherIcon = <FontAwesomeIcon className="weather--icon" icon={faSun} />;
		else {
			weatherIcon = <FontAwesomeIcon className="weather--icon" icon={faMoon} />;
		}
	} else if (weatherData.conditions === 'Clouds') {
		weatherIcon = <FontAwesomeIcon className="weather--icon" icon={faCloud} />;
	} else if (weatherData.conditions === 'Drizzle') {
		weatherIcon = (
			<FontAwesomeIcon className="weather--icon" icon={faCloudRain} />
		);
	} else if (weatherData.conditions === 'Rain') {
		weatherIcon = (
			<FontAwesomeIcon className="weather--icon" icon={faCloudShowersHeavy} />
		);
	} else if (weatherData.conditions === 'Thunderstorm') {
		weatherIcon = (
			<FontAwesomeIcon className="weather--icon" icon={faCloudBolt} />
		);
	} else if (weatherData.conditions === 'Snow') {
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
				{isLoading && (
					<div>
						<h2>Loading...</h2>
					</div>
				)}
				{!isLoading /*display*/ && (
					<div className="results">
						<h2 className="weather--location">{weatherData.location} </h2>
						<div className="results--wrapper">
							<div className="conditions--wrapper">
								{!weatherData.code && weatherIcon}
								<p className="weather--conditions">
									{!weatherData.code && weatherData.conditions}
								</p>
							</div>
							<h3 className="weather--temp">
								{!weatherData.code &&
									weatherData.temp &&
									Math.round(weatherData.temp)}
								{!weatherData.code && `º`}
							</h3>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default App;
