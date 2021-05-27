//  ======================================== IMPORTS
import { ThemeContext } from 'index';
import React from 'react';
//  ======================================== COMPONENT
const Checkbox = ({
	id,
	checked,
	setValue
}: {
	id: string;
	checked: boolean;
	setValue: (value: boolean) => void;
}) => {
	//  ======================================== HOOKS
	const { colors } = React.useContext(ThemeContext);
	//  ======================================== STATE
	//  ======================================== HANDLERS
	//  ======================================== EFFECTS
	//  ======================================== JSX
	return (
		<div className='py-2'>
			<input
				type='checkbox'
				id={id}
				checked={checked}
				className='opacity-0 absolute h-6 w-6'
				onChange={(e) => setValue(e.target.checked)}
			/>
			<div
				className={`bg-white border-2 rounded transition-colors ${
					checked ? 'border-primary text-primary' : 'border-secondary-light text-transparent'
				} w-6 h-6 flex flex-shrink-0 justify-center items-center focus-within:border-blue-500`}>
				<svg
					className={`w-3 h-3 text-blue-600 pointer-events-none`}
					version='1.1'
					viewBox='0 0 17 12'
					xmlns='http://www.w3.org/2000/svg'>
					<g fill='none' fill-rule='evenodd'>
						<g
							transform='translate(-9 -11)'
                            className='transition'
							fill={checked ? colors.primary : 'transparent'}
							fill-rule='nonzero'>
							<path d='m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z' />
						</g>
					</g>
				</svg>
			</div>
		</div>
	);
};

//  ======================================== EXPORTS
export default Checkbox;
//  ========================================
