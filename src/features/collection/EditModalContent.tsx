//  ======================================== IMPORTS
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'common/components/Button';
import { selectTargetObject, statusSet } from 'features/collection/collectionSlice';
import { ModalButtonDiv, ModalTitle } from 'common/components/Modal';
import {
	EditorNumInput,
	EditorCheckInput
} from 'features/collection/EditInputs';
import parseItemName from 'common/utils/parsing/parseItemName';
//  ======================================== COMPONENT
const EditModalContent = () => {
	//  ======================================== HOOKS
	const dispatch = useDispatch();

	//  ======================================== STATE
	const initialValues = useSelector(selectTargetObject)
	const [owned, setOwned] = React.useState<number | string>(initialValues.quantity);
	const [buyPrice, setBuyPrice] = React.useState<number | string>(initialValues.buyPrice);
	const [targetPrice, setTargetPrice] = React.useState<number | string>(initialValues.targetPrice);
	const [isFoil, setIsFoil] = React.useState(initialValues.foil);
	//  ======================================== HANDLERS
	const handleCancel = () => dispatch(statusSet({status:'idle'}));
	const handleDelete = () => console.log('handle deletion');

	//  ======================================== EFFECTS
	//  ======================================== JSX
	return (
		<div className='flex flex-col'>
			<ModalTitle>{parseItemName(initialValues)}</ModalTitle>
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
