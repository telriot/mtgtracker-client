//  ======================================== IMPORTS
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'common/components/Button';
import { statusSet } from 'features/collection/collectionSlice';
import { ModalButtonDiv, ModalTitle } from 'common/components/Modal';
import {
	EditorNumInput,
	EditorCheckInput
} from 'features/collection/EditInputs';
//  ======================================== COMPONENT
const EditModalContent = () => {
	//  ======================================== HOOKS
	const dispatch = useDispatch();

	//  ======================================== STATE
	const [owned, setOwned] = React.useState('');
	const [buyPrice, setBuyPrice] = React.useState('');
	const [targetPrice, setTargetPrice] = React.useState('');
	const [isFoil, setIsFoil] = React.useState(false);
	//  ======================================== HANDLERS
	const handleCancel = () => dispatch(statusSet('idle'));
	const handleDelete = () => console.log('handle deletion');

	//  ======================================== EFFECTS
	//  ======================================== JSX
	return (
		<div className='flex flex-col'>
			<ModalTitle>Some Card Name</ModalTitle>
			<div className='mb-6'>
				<EditorNumInput value={owned} setValue={setOwned}>
					Copies Owned
				</EditorNumInput>
				<EditorNumInput value={buyPrice} setValue={setBuyPrice}>
					Buy Price
				</EditorNumInput>
				<EditorNumInput value={targetPrice} setValue={setTargetPrice}>
					Target Price
				</EditorNumInput>
				<EditorCheckInput checked={isFoil} setValue={setIsFoil}>
					Is Foil
				</EditorCheckInput>
			</div>

			<ModalButtonDiv>
				<Button variant='danger' onClick={handleCancel}>
					Cancel
				</Button>
				<Button variant='primary' onClick={handleDelete}>
					Save
				</Button>
			</ModalButtonDiv>
		</div>
	);
};

//  ======================================== EXPORTS
export default EditModalContent;
//  ========================================
