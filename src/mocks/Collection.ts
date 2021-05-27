import { CollectionItem, MagicCard } from 'types'
const Collection : CollectionItem<MagicCard>[] = 
[
    {
        cardName: 'Snapcaster Mage',
        set: 'ISD',
        language: 'EN',
        foil: false,
        minPrice: 25.20,
        medianPrice: 33.60,
        buyPrice: 20,
        targetPrice: 40,
        quantity: 1,
        id:'12345678'
    },
    {
        cardName: 'Shivan Dragon',
        set: '3ED',
        language: 'EN',
        foil: false,
        minPrice: 15.20,
        medianPrice: 23.60,
        buyPrice: 2,
        targetPrice: 30,
        quantity: 4,
        id:'22345678'

    },
    {
        cardName: 'Sinkhole',
        set: '2ED',
        language: 'EN',
        foil: false,
        minPrice: 25.20,
        medianPrice: 100.60,
        buyPrice: 20,
        targetPrice: 200,
        quantity: 3,
        id:'32345678'

    },
    {
        cardName: 'Counterspell',
        set: 'MMQ',
        language: 'JP',
        foil: true,
        minPrice: 55.20,
        medianPrice: 200.60,
        buyPrice: 30,
        targetPrice: 220,
        quantity: 2,
        id:'42345678'
    }
]

export default Collection