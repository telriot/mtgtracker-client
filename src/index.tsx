import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/tailwind.css';
import App from './App';
import store from 'store';
import 'assets/index.css'
import { Provider } from 'react-redux';
import ThemeContext, {theme} from 'themeContext'
// if (process.env.NODE_ENV === 'test') {
// 	const { worker } = require('./mocks/browser')
// 	worker.start()
//   }

ReactDOM.render(
	<React.StrictMode>
		<ThemeContext.Provider value={theme}>
		<Provider store={store}>
			<App />
		</Provider>
		</ThemeContext.Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
