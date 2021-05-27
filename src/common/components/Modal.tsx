//  ======================================== IMPORTS

import React, { MouseEvent } from 'react';

//  ======================================== SUBCOMPONENT
export const ModalTitle = ({ children }: { children: React.ReactNode }) => {
	return <div className='mb-8 text-center text-xl'>{children}</div>;
};
//  ======================================== SUBCOMPONENT
export const ModalButtonDiv = ({ children }: { children: React.ReactNode }) => {
	return <div className='flex justify-around'>{children}</div>;
};
//  ======================================== COMPONENT
interface ModalProps {
	children: React.ReactNode;
	isOpen: boolean;
	onClose: () => void;
}
const Modal = ({ children, isOpen, onClose }: ModalProps) => {
	//  ======================================== HOOKS
	//  ======================================== STATE
	//  ======================================== HANDLERS
	const handleModalClick = (e: MouseEvent) => e.stopPropagation();
	//  ======================================== EFFECTS
	//  ======================================== JSX
	return (
		<div
			className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center transition-color duration-100 ${isOpen? 'bg-gray-700 bg-opacity-30':'opacity-0 pointer-events-none'}`}
			onClick={onClose}>
			<div
				onClick={handleModalClick}
				className={`rounded w-96 px-12 py-8 ${isOpen? 'bg-white bg-opacity-100':'bg-transparent bg-opacity-0'}`}>
				{children}
			</div>
		</div>
	);
};

//  ======================================== EXPORTS
export default Modal;
//  ========================================
