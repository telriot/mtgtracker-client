//  ======================================== IMPORTS
import { CollectionItem, MagicCard } from 'types';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import {
	cardDeselected,
	cardMultiSelected,
	cardSelected,
	selectSelectedCardIds,
	statusSet
} from './collectionSlice';
import React from 'react';
//  ======================================== SUBCOMPONENT
interface CardTextBlockProps {
	header: string;
	text: string | number;
	span?: number;
	position?: 'start' | 'end';
}

const CardTextBlock = ({
	header,
	text,
	span = 1,
	position = 'end'
}: CardTextBlockProps) => {
	const textAlignment = position === 'end' ? 'right' : 'left';
	return (
		<div className={`flex flex-col items-${position} col-span-${span}`}>
			<div className={`text-${textAlignment} text-xs text-gray-400`}>
				{header}
			</div>
			<div className={`text-${textAlignment}`}>{text}</div>
		</div>
	);
};

//  ======================================== SUBCOMPONENT
export interface CardActionBlockProps {
	onEdit: () => void;
	onDelete: () => void;
}
const CardActionBlock = ({ onEdit, onDelete }: CardActionBlockProps) => {
	const iconSize = 20;
	return (
		<div className='flex flex-row justify-end items-center col-span-1'>
			<FiEdit
				onClick={onEdit}
				size={iconSize}
				className='mr-3 cursor-pointer'
			/>
			<FiTrash
				onClick={onDelete}
				size={iconSize}
				className='cursor-pointer'
			/>
		</div>
	);
};

interface MTGItemCardProps {
	card: CollectionItem<MagicCard>;
}

//  ======================================== COMPONENT
const MTGItemCard = ({ card }: MTGItemCardProps) => {
	//  ======================================== HOOKS
	const dispatch = useDispatch();
	const {
		cardName,
		set,
		language,
		foil,
		minPrice,
		medianPrice,
		buyPrice,
		targetPrice,
		quantity,
		id
	} = card;
	//  ======================================== STATE
	const selectedCardIds = useSelector(selectSelectedCardIds);
	const isSelected = selectedCardIds.includes(id);
	//  ======================================== HANDLERS
	const handleDelete = () =>
		dispatch(statusSet({ status: 'deleting', target: card }));
	const handleEdit = () =>
		dispatch(statusSet({ status: 'editing', target: card }));
	const handleClick = (event: React.MouseEvent) => {
		const isMultiSelecting = event.ctrlKey;
		if (isMultiSelecting) {
			isSelected
				? dispatch(cardDeselected(id))
				: dispatch(cardMultiSelected(id));
		} else {
			isSelected && selectedCardIds.length === 1
				? dispatch(cardDeselected(id))
				: dispatch(cardSelected(id));
		}
	};
	//  ======================================== EFFECTS
	//  ======================================== JSX
	return (
		<div
			className={`grid grid-cols-12 rounded border-2 border-${
				isSelected ? 'primary' : 'secondary-light'
			} px-4 py-2 mb-2`}
			onClick={handleClick}>
			<CardTextBlock
				header='Name'
				text={cardName}
				span={3}
				position='start'
			/>
			<CardTextBlock header='Qty' text={quantity} />
			<CardTextBlock header='Expansion' text={set} />
			<CardTextBlock header='Language' text={language} />
			<CardTextBlock header='Foil' text={foil ? 'Yes' : 'No'} />
			<CardTextBlock header='Min' text={minPrice} />
			<CardTextBlock header='Median' text={medianPrice} />
			<CardTextBlock header='Buy Price' text={buyPrice} />
			<CardTextBlock header='Target Price' text={targetPrice} />
			<CardActionBlock onDelete={handleDelete} onEdit={handleEdit} />
		</div>
	);
};

//  ======================================== EXPORTS
export default MTGItemCard;
//  ========================================
