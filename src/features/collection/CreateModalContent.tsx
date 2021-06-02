//  ======================================== IMPORTS
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'common/components/Button';
import { fetchMKMData, statusSet } from 'features/collection/collectionSlice';
import { ModalButtonDiv, ModalTitle } from 'common/components/Modal';
import {
	EditorNumInput,
	EditorCheckInput
} from 'features/collection/EditInputs';
import AsyncSelect from 'react-select/async';
import { getCardsByNameViaScf } from 'api';
import debounce from 'debounce-promise';
import { ThemeContext } from 'index';
import parseItemName from 'common/utils/parsing/parseItemName';
//  ======================================== COMPONENT
const CreateModalContent = () => {
	//  ======================================== HOOKS
	const dispatch = useDispatch();
	//  ======================================== STATE
	const [owned, setOwned] = React.useState('');
	const [buyPrice, setBuyPrice] = React.useState('');
	const [targetPrice, setTargetPrice] = React.useState('');
	const [isFoil, setIsFoil] = React.useState(false);
	const [selectedCard, setSelectedCard] =
		React.useState<{
			cardName: string;
			set: string;
			cardmarket_id: string;
		} | null>(null);
	const { colors } = React.useContext(ThemeContext);
	const customSelectStyles = {
		control: () => ({
			border: `solid 2px ${colors['secondary-light']}`,
			display: 'flex',
			borderRadius: '4px'
		})
	};
	//  ======================================== HANDLERS
	const handleCancel = () => dispatch(statusSet({ status: 'idle' }));
	const handleSave = () => console.log('handle save');
	const handleSelectChange = (card: Record<string, string>) =>
		setSelectedCard({
			cardName: card.name,
			set: card.set,
			cardmarket_id: card.cardmarket_id
		});
	const optionSearch = (value: string) => getCardsByNameViaScf(value);
	const debouncedSearch = debounce(optionSearch, 300, { leading: true });

	//  ======================================== EFFECTS
	// React.useEffect(() => {
	// 	if (!selectedCard) return;
	// 	const { cardmarket_id } = selectedCard;
	// 	dispatch(fetchMKMData(cardmarket_id));
	// }, [selectedCard]);
	//  ======================================== JSX
	return (
		<div className='flex flex-col'>
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
