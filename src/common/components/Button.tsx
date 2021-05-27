//  ======================================== IMPORTS
import React from 'react';
//  ======================================== COMPONENT
interface ButtonProps {
	children: React.ReactNode;
	disabled?: boolean,
	onClick: () => void;
	variant?: 'primary' | 'secondary' | 'danger';
}
const Button = ({ children, onClick, variant = 'primary', disabled }: ButtonProps) => {
	//  ======================================== HOOKS
	//  ======================================== STATE
	const bgBase = disabled?`${variant}-light`:variant
	const bgDark = disabled?`${variant}-light`:`${variant}-dark`
	//  ======================================== HANDLERS
	//  ======================================== EFFECTS
	//  ======================================== JSX
	return (
		<button
			disabled={disabled}
			className={`w-max flex items-center px-4 py-2 rounded bg-${bgBase} hover:bg-${bgDark} focus:bg-${bgDark} text-white transition-colors cursor-pointer`}
			onClick={onClick}>
			{children}
		</button>
	);
};

//  ======================================== EXPORTS
export default Button;
//  ========================================
