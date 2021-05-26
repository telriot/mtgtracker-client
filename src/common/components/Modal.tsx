//  ======================================== IMPORTS

import React, { MouseEvent } from 'react';

//  ======================================== SUBCOMPONENT
export const ModalButtonDiv = ({ children }: { children: React.ReactNode }) => {
	return <div className='flex justify-around'>{children}</div>;
};
//  ======================================== COMPONENT
interface ModalProps {
	children: React.ReactNode;
	onClose: () => void;
}
const Modal = ({ children, onClose }: ModalProps) => {
	//  ======================================== HOOKS
	//  ======================================== STATE
	//  ======================================== HANDLERS
	const onModalClick = (e: MouseEvent) => e.stopPropagation();
	//  ======================================== EFFECTS
	//  ======================================== JSX
	return (
		<div
			className='fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-700 bg-opacity-30'
			onClick={onClose}>
			<div
				onClick={onModalClick}
				className='bg-white rounded w-96 px-12 py-8'>
				{children}
			</div>
		</div>
	);
};

//  ======================================== EXPORTS
export default Modal;
//  ========================================
