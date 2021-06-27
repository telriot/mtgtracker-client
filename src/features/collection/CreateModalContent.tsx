//  ======================================== IMPORTS
import React,{ FC } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'common/components/Button';
import {
	addCollectionItem,
	statusSet
} from 'features/collection/collectionSlice';
import { ModalButtonDiv, ModalTitle } from 'common/components/Modal';
import {
	NumInput,
	CheckInput,
	SelectInput
} from 'common/components/EditInputs';
import AsyncSelect from 'react-select/async';
import { getCardsByNameViaScf } from 'api';
import debounce from 'debounce-promise';
import ThemeContext from 'themeContext';
import { customStyles } from 'styles/reactSelectStyles';
import parseItemName from 'common/utils/parsing/parseItemName';
import { langOptions } from 'assets/cardData';
import { LangVariant, ScryfallCard } from 'types';
//  ======================================== COMPONENT
const CreateModalContent: FC<unknown> = () => {
	//  ======================================== HOOKS
	const dispatch = useDispatch();
	//  ======================================== STATE
	const [language, setLanguage] = React.useState<string>('EN');
	const [quantity, setQuantity] = React.useState('');
	const [buyPrice, setBuyPrice] = React.useState('');
	const [targetPrice, setTargetPrice] = React.useState('');
	const [isFoil, setIsFoil] = React.useState(false);
	const [selectedCard, setSelectedCard] = React.useState<{
		cardName: string;
		set: string;
		cardmarket_id: string;
		cardObject: ScryfallCard;
	} | null>(null);
	const theme = React.useContext(ThemeContext);
	const customSelectStyles = customStyles(theme);
	//  ======================================== HANDLERS
	const handleCancel = () => dispatch(statusSet({ status: 'idle' }));
	const handleSave = () =>
		selectedCard.cardObject &&
		dispatch(
			addCollectionItem({
				card: selectedCard.cardObject,
				quantity: parseInt(quantity),
				buyPrice: parseFloat(buyPrice),
				targetPrice: parseFloat(targetPrice),
				language:language as LangVariant,
				isFoil
			})
		);
	const handleSelectChange = (card:ScryfallCard ) =>
		setSelectedCard({
			cardName: card.name,
			set: card.set,
			cardmarket_id: card.cardmarket_id,
			cardObject: card
		});
	const optionSearch = (value: string) => getCardsByNameViaScf(value);
	const debouncedSearch = debounce(optionSearch, 300, { leading: true });

	//  ======================================== EFFECTS
	//  ======================================== JSX
	return (
		<div aria-label='create-modal' className='flex flex-col'>
			<ModalTitle>Add a card</ModalTitle>
			<AsyncSelect
				loadOptions={debouncedSearch}
				getOptionLabel={(card) =>
					parseItemName({ ...card, cardName: card.name })
				}
				getOptionValue={({ name, set }) => `${name}-${set}`}
				onChange={handleSelectChange}
				className='mb-6'
				styles={customSelectStyles}
			/>
			<div className='mb-6'>
				<SelectInput
					options={langOptions}
					value={language}
					setValue={setLanguage}>
					Language
				</SelectInput>
				<NumInput value={quantity} setValue={setQuantity}>
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
				<Button variant='danger' onClick={handleCancel}>
					Cancel
				</Button>
				<Button variant='primary' onClick={handleSave}>
					Save
				</Button>
			</ModalButtonDiv>
		</div>
	);
};

//  ======================================== EXPORTS
export default CreateModalContent;
//  ========================================
