//  ======================================== IMPORTS
import React from 'react';
import clsx from 'clsx'
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
			className={clsx(
				`bg-${bgBase} hover:bg-${bgDark} focus:bg-${bgDark}`, {
				'flex items-center justify-center rounded text-white transition-colors cursor-pointer': true,
				'w-full':block,
				'w-max':!block,
				'px-2 py-1': size==='sm',
				'px-5 py-3': size==='lg',
				'px-4 py-2': !size
			}, className)}
			onClick={onClick}>
			{children}
		</button>
	);
};

//  ======================================== EXPORTS
export default Button;
//  ========================================
