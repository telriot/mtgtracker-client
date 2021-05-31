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
import { Popover } from 'react-tiny-popover';

const TEST_IMGURL =
	'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=39884&type=card';
//  ======================================== SUBCOMPONENT
interface CardTextBlockProps {
	header: string;
	position?: 'start' | 'end';
	span?: number;
	text: string | number;
}

const CardTextBlock = ({
	header,
	position = 'end',
	span = 1,
	text
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
	const [showCardImg, setShowCardImg] = React.useState(false);
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
	const handleNameBlockMouseEnter = () => setShowCardImg(true);
	const handleNameBlockMouseLeave = () => setShowCardImg(false);

	//  ======================================== EFFECTS
	//  ======================================== JSX
	return (
		<>
			<div
				className={`grid grid-cols-12 rounded border-2 border-${
					isSelected ? 'primary' : 'secondary-light'
				} px-4 py-2 mb-2`}
				onClick={handleClick}>
				<div className={`flex flex-col items-start col-span-3`}>
					<div className={`text-left text-xs text-gray-400`}>
						Name
					</div>
					<Popover
						isOpen={showCardImg}
						positions={['right']}
						padding={10}
						content={
							<div>
								<img src={TEST_IMGURL} alt={card.cardName} />
							</div>
						}>
						<div
							onMouseEnter={handleNameBlockMouseEnter}
							onMouseLeave={handleNameBlockMouseLeave}
							className={`text-left`}>
							{cardName}
						</div>
					</Popover>
				</div>
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
		</>
	);
};

//  ======================================== EXPORTS
export default MTGItemCard;
//  ========================================
