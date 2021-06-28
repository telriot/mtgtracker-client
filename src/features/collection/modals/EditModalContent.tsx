//  ======================================== IMPORTS
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'common/components/Button';
import {
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
import { LangVariant, AsyncStatus, CollectionItem, MagicCard } from 'types';

//  ======================================== COMPONENT
interface EditModalContentProps {
	status: AsyncStatus;
	target: CollectionItem<MagicCard>;
}
const EditModalContent: FC<EditModalContentProps> = ({ status, target }) => {
	//  ======================================== HOOKS
	const dispatch = useDispatch();

	//  ======================================== STATE
	const [language, setLanguage] = React.useState<string>(target.language);

	const [owned, setOwned] = React.useState<string>(
		target.quantity.toString()
	);
	const [buyPrice, setBuyPrice] = React.useState<string>(
		target.buyPrice.toString()
	);
	const [targetPrice, setTargetPrice] = React.useState<string>(
		target.targetPrice.toString()
	);
	const [isFoil, setIsFoil] = React.useState(target.foil);
	//  ======================================== HANDLERS
	const handleCancel = () => dispatch(statusSet({ status: 'idle' }));
	const handleEdit = () =>
		dispatch(
			updateCollectionItem({
				id: target.id,
				quantity: parseFloat(owned),
				buyPrice: parseFloat(buyPrice),
				targetPrice: parseFloat(targetPrice),
				language: language as LangVariant,
				foil: isFoil
			})
		);

	//  ======================================== EFFECTS
	//  ======================================== JSX
	return (
		<div aria-label='edit-modal' className='flex flex-col'>
			<ModalTitle>{parseItemName(target)}</ModalTitle>
			<div className='mb-6'>
				<SelectInput
					options={langOptions}
					value={language}
					setValue={setLanguage}>
					Language
				</SelectInput>

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
				<Button
					variant='danger'
					disabled={status === 'pending'}
					onClick={handleCancel}>
					Cancel
				</Button>
				<Button
					variant='primary'
					disabled={status === 'pending'}
					onClick={handleEdit}>
					Save
				</Button>
			</ModalButtonDiv>
		</div>
	);
};

//  ======================================== EXPORTS
export default EditModalContent;
//  ========================================
