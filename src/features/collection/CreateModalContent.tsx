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
import AsyncSelect from 'react-select/async';
import { getCardsByNameViaScf } from 'api';
import debounce from 'debounce-promise';
import { ThemeContext } from 'index';
//  ======================================== COMPONENT
const CreateModalContent = () => {
	//  ======================================== HOOKS
	const dispatch = useDispatch();
	//  ======================================== STATE
	const [owned, setOwned] = React.useState('');
	const [buyPrice, setBuyPrice] = React.useState('');
	const [targetPrice, setTargetPrice] = React.useState('');
	const [isFoil, setIsFoil] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState<{name:string, set:string} | null>(null)
	const { colors } = React.useContext(ThemeContext);
	const customSelectStyles = {
		control: () => ({
			border: `solid 2px ${colors['secondary-light']}`,
			display: 'flex',
			borderRadius: '4px'
		})
	};
	//  ======================================== HANDLERS
	const handleCancel = () => dispatch(statusSet('idle'));
	const handleDelete = () => console.log('handle deletion');
    const handleSelectChange = (card:Record<string, string>) => setSelectedCard({name:card.name, set:card.set})
	const optionSearch = (value: string) => getCardsByNameViaScf(value);
	const debouncedSearch = debounce(optionSearch, 300, { leading: true });

	//  ======================================== EFFECTS
	//  ======================================== JSX
	return (
		<div className='flex flex-col'>
            <ModalTitle>Add a card</ModalTitle>
			<AsyncSelect
				loadOptions={debouncedSearch}
				getOptionLabel={({ name, set }) =>
					`${name} (${set.toUpperCase()})`
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
				<Button variant='primary' onClick={handleDelete}>
					Save
				</Button>
			</ModalButtonDiv>
		</div>
	);
};

//  ======================================== EXPORTS
export default CreateModalContent;
//  ========================================
