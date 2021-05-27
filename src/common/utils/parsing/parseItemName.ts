import { CollectionItem } from "types"

const parseItemName = (item:CollectionItem<any>) => `${item.cardName}${item.set? ` (${item.set.toUpperCase()})`:''}`

export default parseItemName