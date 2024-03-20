import { numberFromString } from './utils'

export const pluginName =
  import.meta.env.VITE_PLUGIN_NAME || 'notion-picker-plugin'

export const throttleMs =
  numberFromString(import.meta.env.VITE_THROTTLE_MS) || 300

export const defaultPerPage =
  numberFromString(import.meta.env.VITE_DEFAULT_PER_PAGE) || 12

export const notionServerlessUrl = import.meta.env.VITE_NOTION_SERVERLESS_URL || ''