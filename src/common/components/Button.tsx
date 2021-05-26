//  ======================================== IMPORTS
import React from 'react';
//  ======================================== COMPONENT
interface ButtonProps {
	children: React.ReactNode;
	onClick: () => void;
	variant?: 'primary' | 'secondary' | 'danger';
}
const Button = ({ children, onClick, variant = 'primary' }: ButtonProps) => {
	//  ======================================== HOOKS
	//  ======================================== STATE
	//  ======================================== HANDLERS
	//  ======================================== EFFECTS
	//  ======================================== JSX
	return (
		<div
			className={`w-max flex items-center px-4 py-2 rounded bg-${variant} hover:bg-${variant}-dark focus:bg-${variant}-dark text-white transition-colors cursor-pointer`}
			onClick={onClick}>
			{children}
		</div>
	);
};

//  ======================================== EXPORTS
export default Button;
//  ========================================
