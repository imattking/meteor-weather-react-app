import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles.css';

import App from './App';

const rootNode = document.querySelector('#root');

const root = ReactDOM.createRoot(rootNode);

root.render(
	<div className="app--container">
		<App />
	</div>
);
