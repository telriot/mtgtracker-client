import { CollectionItem, MagicCard } from 'types';

const parseItemName = (item: Partial<CollectionItem<MagicCard>>): string =>
	`${item.cardName}${item.set ? ` (${item.set.toUpperCase()})` : ''}`;

export default parseItemName;
