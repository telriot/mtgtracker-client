//  ======================================== IMPORTS
import { useContext } from 'react';
import Loader from 'react-loader-spinner';
import { ThemeContext } from 'index';

//  ======================================== COMPONENT
const LoadingOverlay = () => {
	//  ======================================== HOOKS
	//  ======================================== STATE
	const { colors } = useContext(ThemeContext);
	//  ======================================== HANDLERS
	//  ======================================== EFFECTS
	//  ======================================== JSX
	return (
		<div
			className='absolute top-0 left-0 bottom-0 right-0 grid place-items-center'
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
