import { CollectionItem, MagicCard, ServerSideCard } from 'types';

/**
 * 
 * @param docs Paginated docs from express API
 * @returns A collection of consumable CollectionItems
 */
const formatAPICardResults = (docs:ServerSideCard[]) : CollectionItem<MagicCard>[] => {
	return docs.map((card) =>({
		id: card._id,
		minPrice: card.scryfallPrices.eur || 0,
		medianPrice:  card.scryfallPrices.eur || 0,
		buyPrice: card.buyPrice,
		targetPrice: card.targetPrice,
		quantity: card.quantity,
		set: card.expansion.toUpperCase(),
		language: card.language,
		foil: card.foil,
		image:card.image,
		cardName: card.name,
		prices:{
			eur: card.scryfallPrices.eur,
			usd: card.scryfallPrices.usd,
			usdFoil: card.scryfallPrices.usdFoil,
			eurFoil: card.scryfallPrices.eurFoil,
			tix: card.scryfallPrices.tix
		}
	})) 
}

export default formatAPICardResults