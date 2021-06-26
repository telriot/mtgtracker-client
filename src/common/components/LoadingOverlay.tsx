//  ======================================== IMPORTS
import React from 'react'
import { useContext } from 'react';
import Loader from 'react-loader-spinner';
import ThemeContext from 'themeContext';

//  ======================================== COMPONENT
const LoadingOverlay : React.FC<unknown> = () => {
	//  ======================================== HOOKS
	//  ======================================== STATE
	const { colors } = useContext(ThemeContext);
	//  ======================================== HANDLERS
	//  ======================================== EFFECTS
	//  ======================================== JSX
	return (
		<div
			className='absolute top-0 left-0 bottom-0 right-0 grid place-items-center'
			aria-label='loading-overlay'
			style={{ background: 'rgba(0,0,0,.1' }}>
			<Loader
				type='Puff'
				color={colors.primary}
				height={100}
				width={100}
				timeout={3000}
			/>
		</div>
	);
};

//  ======================================== EXPORTS
export default LoadingOverlay;
//  ========================================
