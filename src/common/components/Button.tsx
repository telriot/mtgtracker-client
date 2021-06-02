//  ======================================== IMPORTS
import React from 'react';
//  ======================================== COMPONENT
interface ButtonProps {
	children: React.ReactNode;
	className?: string;
	block?: boolean;
	disabled?: boolean;
	onClick: () => void;
	size?: 'sm' | 'lg';
	variant?: 'primary' | 'secondary' | 'danger';
}
const Button = ({
	block,
	className = '',
	children,
	onClick,
	size,
	variant = 'primary',
	disabled
}: ButtonProps) => {
	//  ======================================== HOOKS
	//  ======================================== STATE
	const bgBase = disabled ? `${variant}-light` : variant;
	const bgDark = disabled ? `${variant}-light` : `${variant}-dark`;
	//  ======================================== HANDLERS
	//  ======================================== EFFECTS
	//  ======================================== JSX
	return (
		<button
			disabled={disabled}
			className={`${block ? 'w-full' : 'w-max'} flex items-center justify-center ${
				size === 'sm'
					? 'px-2 py-1'
					: size === 'lg'
					? 'px-5 py-3'
					: 'px-4 py-2'
			} rounded bg-${bgBase} hover:bg-${bgDark} focus:bg-${bgDark} text-white transition-colors cursor-pointer ${className}`}
			onClick={onClick}>
			{children}
		</button>
	);
};

//  ======================================== EXPORTS
export default Button;
//  ========================================
