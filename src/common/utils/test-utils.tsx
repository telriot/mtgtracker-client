import React, { createContext, FC, ReactElement } from 'react';
import {
	Queries,
	render,
	RenderOptions,
	RenderResult
} from '@testing-library/react';
import { Provider } from 'react-redux';
import store from 'store';
const theme = require('../../theme.js');
export const ThemeContext = createContext(theme);

const AllTheProviders: FC<{ children?: React.ReactNode }> = ({ children }) => {
	return (
		<ThemeContext.Provider value={theme}>
			<Provider store={store}>{children}</Provider>
		</ThemeContext.Provider>
	);
};

const customRender = (
	ui: ReactElement,
	options?: Omit<RenderOptions, 'queries'>
): RenderResult<Queries, HTMLElement> =>
	render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };
