//  ======================================== IMPORTS
import { CollectionItem, MagicCard } from 'types';
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
import { useMediaQuery } from 'react-responsive';
import Button from 'common/components/Button';
import { ReactComponent as More } from 'assets/svg/more.svg';
import { ReactComponent as Less } from 'assets/svg/chevron-up.svg';
import { CardTextBlock, CardActionBlock } from 'common/components/CardBlocks';

//  ======================================== COMPONENT
interface MTGItemCardProps {
	card: CollectionItem<MagicCard>;
}

const MTGItemCard = ({ card }: MTGItemCardProps) => {
	//  ======================================== HOOKS
	const dispatch = useDispatch();
	const isMd = useMediaQuery({
		query: '(min-width: 640px)'
	});

	//  ======================================== STATE
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
	const [showCardImg, setShowCardImg] = React.useState(false);
	const [isExpanded, setIsExpanded] = React.useState(false);
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
	const toggleExpand = () => setIsExpanded((prev) => !prev);
	const mainInfoBlock = [
		{ header: 'Qty', content: quantity },
		{ header: 'Set', content: set }
	];
	const detailBlock = [
		{ header: 'Lang', content: language },
		{ header: 'Foil', content: foil ? 'Yes' : 'No' },
		{ header: 'Min', content: minPrice },
		{ header: 'Median', content: medianPrice },
		{ header: 'Buy', content: buyPrice },
		{ header: 'Target', content: targetPrice }
	];
	//  ======================================== EFFECTS
	//  ======================================== JSX
	return (
		<div
			className={`rounded border-2 border-${
				isSelected ? 'primary' : 'secondary-light'
			} px-4 py-2 mb-2`}
			onClick={handleClick}>
			<div className='grid grid-cols-12 gap-2'>
				{isMd ? (
					// FULL SIZE VERSION
					<>
						<CardTextBlock header='Name' position='start' span={3}>
							<Popover
								isOpen={showCardImg}
								positions={['right']}
								padding={10}
								content={
									<CardImage
										src={card.image}
										alt={card.cardName}
										zoom={3}
									/>
								}>
								<div
									onMouseEnter={handleNameBlockMouseEnter}
									onMouseLeave={handleNameBlockMouseLeave}
									className={`text-left truncate`}>
									{cardName}
								</div>
							</Popover>
						</CardTextBlock>
						{mainInfoBlock.map(({ header, content }) => (
							<CardTextBlock header={header} children={content} />
						))}
						{detailBlock.map(({ header, content }) => (
							<CardTextBlock header={header} children={content} />
						))}

						<CardActionBlock
							onDelete={handleDelete}
							onEdit={handleEdit}
						/>
					</>
				) : (
					// MOBILE VERSION
					<>
						<CardTextBlock header='Name' position='start' span={6}>
							{/* HAVE TO KEEP POPOVER HERE BECAUSE OF LIBRARY REQUIREMENTS */}
							<Popover
								isOpen={false}
								positions={['right']}
								content={null}>
								<div className={`text-left truncate`}>{cardName}</div>
							</Popover>
						</CardTextBlock>
						{mainInfoBlock.map(({ header, content }) => (
							<CardTextBlock
								header={header}
								span={2}
								children={content}
							/>
						))}
						<div className='col-start-11 flex col-span-2 items-center justify-end'>
							<Button
								onClick={toggleExpand}
								size='sm'
								className='col-start-11'>
								{isExpanded ? (
									<Less className='h-6 w-5 fill-current' />
								) : (
									<More className='h-6 w-5' />
								)}
							</Button>
						</div>
						{isExpanded && (
							<>
								{detailBlock.map(({ header, content }) => (
									<CardTextBlock
										header={header}
										children={content}
										size='sm'
										span={2}
									/>
								))}
								<Button
									className='col-span-6'
									block
									size='sm'
									onClick={handleDelete}>
									Delete
								</Button>
								<Button
									className='col-span-6'
									block
									size='sm'
									onClick={handleEdit}>
									Edit
								</Button>
							</>
						)}
					</>
				)}
			</div>
		</div>
	);
};

//  ======================================== EXPORTS
export default MTGItemCard;
//  ========================================
