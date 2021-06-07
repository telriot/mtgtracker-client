import { CollectionItem, MagicCard } from 'types';

/**
 * 
 * @param docs Paginated docs from express API
 * @returns A collection of consumable CollectionItems
 */
const formatAPICardResults = (docs:any[]) : CollectionItem<MagicCard>[] => {
	return docs.map((card) =>({
		id: card._id,
		minPrice: parseFloat(card.item.scryfallPrices.eur) || 0,
		medianPrice:  parseFloat(card.item.scryfallPrices.eur) || 0,
		buyPrice: card.buyPrice,
		targetPrice: card.targetPrice,
		quantity: card.quantity,
		set: card.item.expansion.toUpperCase(),
		language: card.language,
		foil: card.foil,
		image:card.item.image,
		cardName: card.item.cardName
	})) 
}

export default formatAPICardResults