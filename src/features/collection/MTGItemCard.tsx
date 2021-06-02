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
import CardImage from 'common/components/CardImage';

//  ======================================== SUBCOMPONENT
interface CardTextBlockProps {
	header: string;
	position?: 'start' | 'end';
	span?: number;
	children?: React.ReactNode
}

const CardTextBlock = ({
	header,
	position = 'end',
	span = 1,
	children
}: CardTextBlockProps) => {
	const textAlignment = position === 'end' ? 'right' : 'left';
	return (
		<div className={`flex flex-col items-${position} col-span-${span} cursor-default`}>
			<div className={`text-${textAlignment} text-xs text-gray-400`}>
				{header}
			</div>
			<div className={`text-${textAlignment}`}>{children}</div>
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
				<CardTextBlock header="Name" position='start' span={3}>
				<Popover
						isOpen={showCardImg}
						positions={['right']}
						padding={10}
						content={
							<CardImage src={card.image} alt={card.cardName} zoom={3}/>
						}>
						<div
							onMouseEnter={handleNameBlockMouseEnter}
							onMouseLeave={handleNameBlockMouseLeave}
							className={`text-left`}>
							{cardName}
						</div>
					</Popover>
				</CardTextBlock>

				<CardTextBlock header='Qty' children={quantity} />
				<CardTextBlock header='Expansion' children={set} />
				<CardTextBlock header='Language' children={language} />
				<CardTextBlock header='Foil' children={foil ? 'Yes' : 'No'} />
				<CardTextBlock header='Min' children={minPrice} />
				<CardTextBlock header='Median' children={medianPrice} />
				<CardTextBlock header='Buy Price' children={buyPrice} />
				<CardTextBlock header='Target Price' children={targetPrice} />
				<CardActionBlock onDelete={handleDelete} onEdit={handleEdit} />
			</div>
		</>
	);
};

//  ======================================== EXPORTS
export default MTGItemCard;
//  ========================================
