import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Form from '../components/Form';
import WeatherIcon from '../components/WeatherIcon';
import useGetLocation from '../util/hooks/useGetLocation';

const App = () => {
	const [darkMode, setDarkMode] = useState(
		() => JSON.parse(localStorage.getItem('mode')) || false
	);
	const [zip, setZip] = useState('30605');
	const [display, setDisplay] = useState(false);
	const [formData, setFormData] = useState({});
	const { weatherData, loading, error } = useGetLocation(zip);

	console.log(weatherData, loading, error);

	const handleChange = (e) => {
		const { value } = e.target;
		setFormData({ zipCode: value });
		setDisplay(false);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setZip(formData.zipCode);
		setDisplay(true);
	};

	useEffect(() => {
		localStorage.setItem('mode', JSON.stringify(darkMode));
	}, [darkMode]);

	const toggle = () => {
		setDarkMode((prevMode) => !prevMode);
	};

	return (
		<>
			<div className={darkMode ? 'container dark' : 'container'}>
				{/* DarkMode Toggle */}
				<Navbar darkMode={darkMode} toggle={toggle} />

				{/* User Input Form */}
				<Form
					darkMode={darkMode}
					handleChange={handleChange}
					handleSubmit={handleSubmit}
					value={zip}
				/>

				{/* Loading Indication */}
				{display && loading && (
					<div>
						<h2>Loading...</h2>
					</div>
				)}

				{/* Weather Location Data Results */}
				{display && error && (
					<div>
						<h2>Invalid Zip Code</h2>
					</div>
				)}

				{display && !loading && !error && (
					<div className="results">
						<h2 className="weather--location">{weatherData.location} </h2>
						<div className="results--wrapper">
							<div className="conditions--wrapper">
								{!error && (
									<WeatherIcon weatherData={weatherData} error={error} />
								)}
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
