//  ======================================== IMPORTS
import React, { FC, useContext } from 'react';
import { ModalTitle } from 'common/components/Modal';
import Loader from 'react-loader-spinner';
import ThemeContext from 'themeContext';

//  ======================================== COMPONENT
const BulkAddModalContent: FC<unknown> = () => {
	//  ======================================== HOOKS
	const { colors } = useContext(ThemeContext);

	//  ======================================== STATE
	//  ======================================== HANDLERS
	//  ======================================== EFFECTS
	//  ======================================== JSX
	return (
		<div aria-label='bulk-add-modal' className='flex flex-col items-center'>
			<ModalTitle>Loading your collection</ModalTitle>
			<Loader
				type='ThreeDots'
				color={colors.primary}
				height={30}
				width={150}
				timeout={10000}
			/>
		</div>
	);
};

//  ======================================== EXPORTS
export default BulkAddModalContent;
//  ========================================
