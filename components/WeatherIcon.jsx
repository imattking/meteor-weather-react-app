import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { faCloudRain } from '@fortawesome/free-solid-svg-icons';
import { faCloudShowersHeavy } from '@fortawesome/free-solid-svg-icons';
import { faCloudBolt } from '@fortawesome/free-solid-svg-icons';
import { faSnowflake } from '@fortawesome/free-solid-svg-icons';
import { faSmog } from '@fortawesome/free-solid-svg-icons';

const WeatherIcon = (props) => {
	let weatherIcon;

	if (props.error) {
		weatherIcon = '';
	} else if (props.conditions === 'Clear') {
		if (hour && hour < 20 && hour > 6)
			weatherIcon = <FontAwesomeIcon className="weather--icon" icon={faSun} />;
		else {
			weatherIcon = <FontAwesomeIcon className="weather--icon" icon={faMoon} />;
		}
	} else if (props.conditions === 'Clouds') {
		weatherIcon = <FontAwesomeIcon className="weather--icon" icon={faCloud} />;
	} else if (props.conditions === 'Drizzle') {
		weatherIcon = (
			<FontAwesomeIcon className="weather--icon" icon={faCloudRain} />
		);
	} else if (props.conditions === 'Rain') {
		weatherIcon = (
			<FontAwesomeIcon className="weather--icon" icon={faCloudShowersHeavy} />
		);
	} else if (props.conditions === 'Thunderstorm') {
		weatherIcon = (
			<FontAwesomeIcon className="weather--icon" icon={faCloudBolt} />
		);
	} else if (props.conditions === 'Snow') {
		weatherIcon = (
			<FontAwesomeIcon className="weather--icon" icon={faSnowflake} />
		);
	} else {
		weatherIcon = <FontAwesomeIcon className="weather--icon" icon={faSmog} />;
	}
	return weatherIcon;
};

export default WeatherIcon;
