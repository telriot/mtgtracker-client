//  ======================================== IMPORTS
import React from 'react';
import { FileInputButton } from 'common/components/Button';
import clsx from 'clsx';
import { useDispatch } from 'react-redux'
import { bulkAddCollectionItems } from './collectionSlice';
// ======================================== UTILS

const parseInput = (
	input: string | null | undefined,
	defaultValue: string | null = null,
): string | null => {
	if (!input || !input.trim()) return defaultValue;
	else return input.trim();
};
const parseInputToFloat = (input: string | null | undefined, defaultValue = 0) : number | null => {
	if(!input || isNaN(parseFloat(input.trim()))){
		return defaultValue
	}
	else return parseFloat(input.trim())
}
//  ======================================== COMPONENT
interface BulkAddButtonProps {
	className?: string;
}
const BulkAddButton: React.FC<BulkAddButtonProps> = ({ className }) => {
	//  ======================================== HOOKS
	const dispatch = useDispatch()
	//  ======================================== STATE
	//  ======================================== HANDLERS
	const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {

		if (!event.target.files[0]) {
			console.log('Could not load any file');
			return;
		}
		const reader = new FileReader();
		reader.onload = async (e) => {
			const text = e.target.result;
			const cards = text
				.toString()
				.split('\n')
				.map((line) => {
					const [main, expansion, lang, foil, buyPrice, targetPrice] = line.split(',');
					let quantity: number, cardName: string;
					const mainBlock = main.split(' ');
					if (isNaN(parseInt(mainBlock[0]))) {
						quantity = 1;
						cardName = main;
					} else {
						quantity = parseInt(mainBlock[0]);
						cardName = mainBlock.slice(1).join(' ').toString();
					}
					const cardObj = {
						name: parseInput(cardName),
						quantity,
						expansion: parseInput(expansion),
						language: parseInput(lang, 'EN'),
                        foil: parseInput(foil) === 'foil',
						buyPrice:parseInputToFloat(buyPrice),
						targetPrice: parseInputToFloat(targetPrice)
					};
					return cardObj;
				})
				.filter((card) => card.name);
				dispatch(bulkAddCollectionItems(cards))
			// console.log(cards, 'Card Object');
		};
		reader.onerror = (err) => {
			console.log(err);
			return;
		};
		reader.readAsText(event.target.files[0]);
		return;
	};
	//  ======================================== EFFECTS
	//  ======================================== JSX
	return (
		<FileInputButton className={clsx(className)} onClick={handleClick}>
			Add from file
		</FileInputButton>
	);
};

//  ======================================== EXPORTS
export default BulkAddButton;
//  ========================================
