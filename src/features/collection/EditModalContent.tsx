//  ======================================== IMPORTS
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'common/components/Button';
import {
	selectAsyncStatus,
	selectTargetObject,
	statusSet,
	updateCollectionItem
} from 'features/collection/collectionSlice';
import { ModalButtonDiv, ModalTitle } from 'common/components/Modal';
import {
	NumInput,
	CheckInput,
	SelectInput

} from 'common/components/EditInputs';
import parseItemName from 'common/utils/parsing/parseItemName';
import { langOptions } from 'assets/cardData';
import { LangVariant } from 'types';

//  ======================================== COMPONENT
const EditModalContent = () => {
	//  ======================================== HOOKS
	const dispatch = useDispatch();

	//  ======================================== STATE
	const initialValues = useSelector(selectTargetObject);
	const [language, setLanguage] = React.useState(initialValues.language)

	const [owned, setOwned] = React.useState<string>(
		initialValues.quantity.toString()
	);
	const [buyPrice, setBuyPrice] = React.useState<string>(
		initialValues.buyPrice.toString()
	);
	const [targetPrice, setTargetPrice] = React.useState<string>(
		initialValues.targetPrice.toString()
	);
	const [isFoil, setIsFoil] = React.useState(initialValues.foil);
	const asyncStatus = useSelector(selectAsyncStatus)
	//  ======================================== HANDLERS
	const handleCancel = () => dispatch(statusSet({ status: 'idle' }));
	const handleEdit = () =>
		dispatch(
			updateCollectionItem({
				id: initialValues.id,
				quantity: parseFloat(owned),
				buyPrice:parseFloat(buyPrice),
				targetPrice: parseFloat(targetPrice),
				language: language as LangVariant,
				foil: isFoil
			})
		);

	//  ======================================== EFFECTS
	//  ======================================== JSX
	return (
		<div className='flex flex-col'>
			<ModalTitle>{parseItemName(initialValues)}</ModalTitle>
			<div className='mb-6'>
			<SelectInput options={langOptions} value={language} setValue={setLanguage}>Language</SelectInput>

				<NumInput value={owned} setValue={setOwned}>
					Copies Owned
				</NumInput>
				<NumInput value={buyPrice} setValue={setBuyPrice}>
					Buy Price
				</NumInput>
				<NumInput value={targetPrice} setValue={setTargetPrice}>
					Target Price
				</NumInput>
				<CheckInput checked={isFoil} setValue={setIsFoil}>
					Is Foil
				</CheckInput>
			</div>

			<ModalButtonDiv>
				<Button variant='danger' disabled={asyncStatus === 'pending'} onClick={handleCancel}>
					Cancel
				</Button>
				<Button variant='primary' disabled={asyncStatus === 'pending'} onClick={handleEdit}>
					Save
				</Button>
			</ModalButtonDiv>
		</div>
	);
};

//  ======================================== EXPORTS
export default EditModalContent;
//  ========================================
