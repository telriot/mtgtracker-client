import { createContext, FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from 'store';
import '@testing-library/jest-dom/extend-expect';

const theme = require('../../theme.js');
export const ThemeContext = createContext(theme);

const AllTheProviders: FC = ({ children }) => {
	return (
		<ThemeContext.Provider value={theme}>
			<Provider store={store}>{children}</Provider>
		</ThemeContext.Provider>
	);
};

const customRender = (
	ui: ReactElement,
	options?: Omit<RenderOptions, 'queries'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };
