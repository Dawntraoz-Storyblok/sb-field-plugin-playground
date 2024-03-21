import { BasketItem } from '@/core'
import { compareName } from '@/utils'
import { notionServerlessUrl } from '@/settings'

export type TempItem = {
  id: number
  name: string
  filename: string | undefined
  description?: string
  category: string | undefined
}

const getNotionEpisodes = async (optionNotionURL: string) => {
  const notionEndpoint = optionNotionURL ?? notionServerlessUrl
  const episodesServerLess = await fetch(notionEndpoint).then((res) => res.json())

  return Object.values(episodesServerLess).reduce(
    (acc: any, episodes: any) => {
      return [...acc, ...episodes.map((episode: any) => ({ id: episode.notion_id, name: episode.title, filename: episode.image, category: `Season ${episode.title.split(' ')[1].split('.')[0]}` }))]
    },
    [],
  ) as TempItem[]
}

// Temporary object, just so that we can save some lines of code
export const tmpAssets = async (optionNotionURL: string): Promise<TempItem[]> => await getNotionEpisodes(optionNotionURL);

export type Item = BasketItem<'item'> & {
  sku: string | undefined
}

export type MockItem = Item & {
  category: string | undefined
}

export const items = async (optionNotionURL: string): Promise<MockItem[]> => (await tmpAssets(optionNotionURL)
).map((mockItems) => {
  const { name, filename, id, description } = mockItems

  return {
    type: 'item',
    id: `${id}`,
    name: name,
    image: filename,
    sku: `sku-${id}`,
    description,
    category: mockItems.category,
  } as MockItem
})
  .sort(compareName)
