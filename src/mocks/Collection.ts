import { CollectionItem, MagicCard } from 'types'
const Collection : CollectionItem<MagicCard>[] = 
[
    {
        cardName: 'Snapcaster Mage',
        expansion: 'ISD',
        language: 'EN',
        foil: false,
        minPrice: 25.20,
        medianPrice: 33.60,
        buyPrice: 20,
        targetPrice: 40,
        quantity: 1
    },
    {
        cardName: 'Shivan Dragon',
        expansion: '3ED',
        language: 'EN',
        foil: false,
        minPrice: 15.20,
        medianPrice: 23.60,
        buyPrice: 2,
        targetPrice: 30,
        quantity: 4
    },
    {
        cardName: 'Sinkhole',
        expansion: '2ED',
        language: 'EN',
        foil: false,
        minPrice: 25.20,
        medianPrice: 100.60,
        buyPrice: 20,
        targetPrice: 200,
        quantity: 3
    },
    {
        cardName: 'Counterspell',
        expansion: 'MMQ',
        language: 'JP',
        foil: true,
        minPrice: 55.20,
        medianPrice: 200.60,
        buyPrice: 30,
        targetPrice: 220,
        quantity: 2
    }
]

export default Collection