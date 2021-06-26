import {createContext} from 'react';
export const theme = require('./theme.js')
const ThemeContext = createContext(theme)
export default ThemeContext
