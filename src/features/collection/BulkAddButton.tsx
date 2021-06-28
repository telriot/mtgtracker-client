//  ======================================== IMPORTS
import React from 'react';
import { FileInputButton } from 'common/components/Button';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { bulkAddCollectionItems } from './collectionSlice';
import parseCardsFromFile from 'common/utils/parsing/parseCardsFromFile';
// ======================================== UTILS

//  ======================================== COMPONENT
interface BulkAddButtonProps {
	className?: string;
}
const BulkAddButton: React.FC<BulkAddButtonProps> = ({ className }) => {
	//  ======================================== HOOKS
	const dispatch = useDispatch();
	//  ======================================== STATE
	//  ======================================== HANDLERS
	const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files[0]) {
			console.log('No file to load');
			return;
		}
		const reader = new FileReader();
		reader.onload = async (e) => {
			const cards = parseCardsFromFile(e.target.result);
			dispatch(bulkAddCollectionItems(cards));
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
		<FileInputButton
			id='bulk-add-button'
			className={clsx(className)}
			onClick={handleClick}>
			Add from file
		</FileInputButton>
	);
};

//  ======================================== EXPORTS
export default BulkAddButton;
//  ========================================
