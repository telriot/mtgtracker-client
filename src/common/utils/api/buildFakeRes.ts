import { SearchFilters } from 'types';
import collection from 'mocks/Collection';

/**
 * 
 * @param currentPage The page the user ir currently on
 * @param pageSize The size of a page in elements
 * @param exclude The items you want to exclude from the search
 * @param filters The filters you want to apply to the search
 * @returns 
 */
const buildFakePaginatedRes = (
	currentPage: number,
	pageSize: number,
	exclude: string[] = [],
	filters?: SearchFilters
) => {
	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = currentPage * pageSize;
	const filteredCollection = collection.filter((card) => {
		if (exclude.includes(card.id)) return false;
		if (filters?.cardName) {
			return card.cardName
				.toLowerCase()
				.match(filters.cardName.toLowerCase());
		}
		return true;
	});
	const pages = Math.ceil(filteredCollection.length / pageSize);
	const cards = filteredCollection
		.sort((a, b) => a.cardName.localeCompare(b.cardName))
		.slice(startIndex, endIndex);
	return { cards, pages };
};

export default buildFakePaginatedRes