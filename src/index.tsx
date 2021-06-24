import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import 'assets/tailwind.css';
import App from './App';
import store from 'store';
import 'assets/index.css'
import { Provider } from 'react-redux';
const theme = require('./theme.js')
export const ThemeContext = createContext(theme)
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
