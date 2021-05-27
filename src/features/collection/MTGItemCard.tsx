//  ======================================== IMPORTS
import { CollectionItem, MagicCard } from 'types';
import { FiEdit, FiTrash} from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { statusSet } from './collectionSlice';
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
		<div
			className={`flex flex-col items-${position} col-span-${span}`}>
			<div className={`text-${textAlignment} text-xs text-gray-400`}>{header}</div>
			<div className={`text-${textAlignment}`}>{text}</div>
		</div>
	);
};

//  ======================================== SUBCOMPONENT
export interface CardActionBlockProps {
    onEdit: () => void
    onDelete: () => void
}
const CardActionBlock = ({onEdit, onDelete}: CardActionBlockProps) => {
    const iconSize = 20
    return (
        <div className='flex flex-row justify-end items-center col-span-1'>
            <FiEdit onClick={onEdit} size={iconSize} className='mr-3 cursor-pointer'/>
            <FiTrash onClick={onDelete} size={iconSize} className='cursor-pointer'/>
        </div>
    )
}

interface MTGItemCardProps {
	card: CollectionItem<MagicCard>;
}

//  ======================================== COMPONENT
const MTGItemCard = ({
	card: {
		cardName,
		expansion,
		language,
		foil,
		minPrice,
		medianPrice,
		buyPrice,
		targetPrice,
		quantity
	}
}: MTGItemCardProps) => {
	//  ======================================== HOOKS
	const dispatch = useDispatch()
	//  ======================================== STATE
	//  ======================================== HANDLERS
    const handleDelete = () => dispatch(statusSet('deleting'))
    const handleEdit = () => dispatch(statusSet('editing'))
	
	//  ======================================== EFFECTS
	//  ======================================== JSX
	return (
		<div className='grid grid-cols-12 rounded border-2 border-gray-300 px-4 py-2 mb-2'>
			<CardTextBlock header='Name' text={cardName} span={3} position='start'/>
			<CardTextBlock header='Qty' text={quantity} />
			<CardTextBlock header='Expansion' text={expansion} />
			<CardTextBlock header='Language' text={language} />
			<CardTextBlock header='Foil' text={foil ? 'Yes' : 'No'} />
			<CardTextBlock header='Min' text={minPrice} />
			<CardTextBlock header='Median' text={medianPrice} />
			<CardTextBlock header='Buy Price' text={buyPrice} />
			<CardTextBlock header='Target Price' text={targetPrice} />
            <CardActionBlock onDelete={handleDelete} onEdit={handleEdit}/>
		</div>
	);
};

//  ======================================== EXPORTS
export default MTGItemCard;
//  ========================================
