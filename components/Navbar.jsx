import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { faMeteor } from '@fortawesome/free-solid-svg-icons';

const Navbar = (props) => {
	return (
		<nav className={props.darkMode ? 'dark' : ''}>
			<div className="header--wrapper">
				<FontAwesomeIcon icon={faMeteor} className="meteor" />
				<h1>Meteor Weather</h1>
			</div>
			<div className="toggle--wrapper">
				{/* <p className="light--text">Light</p> */}
				<div className="toggle--slider" onClick={props.toggle}>
					<div className="toggle--circle"></div>
				</div>
				<FontAwesomeIcon icon={faLightbulb} className="lightbulb" />
				{/* <p className="dark--text">Dark</p> */}
			</div>
		</nav>
	);
};

export default Navbar;
