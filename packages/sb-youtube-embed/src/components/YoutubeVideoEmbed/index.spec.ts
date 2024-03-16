import { render, fireEvent } from '@testing-library/vue'
import { describe, test, expect } from 'vitest'
import { nextTick } from 'vue'

import { setupFieldPlugin } from '@storyblok/field-plugin/test'

import { SbTextField } from '@storyblok/design-system'
import YoutubeVideoEmbed from './index.vue'

describe('YoutubeVideoEmbed', async () => {
  test('should render the component', async () => {
    const { cleanUp } = setupFieldPlugin()

    const { getByTestId } = render(YoutubeVideoEmbed, {
      global: {
        components: {
          SbTextField
        }
      },
    }) // plugin.type === 'loading'
    await nextTick() // plugin.type === 'loaded'

    expect(getByTestId('input-link')).toBeInTheDocument()
    cleanUp()
  })

  test('should showcase the video cover when introducing a correct YouTube video link', async () => {
    const { cleanUp } = setupFieldPlugin()

    const { findByTestId, getByTestId } = render(YoutubeVideoEmbed, {
      global: {
        components: {
          SbTextField
        }
      },
    }) // plugin.type === 'loading'
    await nextTick() // plugin.type === 'loaded'

    await fireEvent.update(getByTestId('input-link'), 'https://www.youtube.com/watch?v=dQw4w9WgXcQ')
    await nextTick()

    expect(await findByTestId('video-embedder')).toBeInTheDocument()

    cleanUp()
  })

  test('should not showcase the video cover and throw an error when introducing a non-YouTube URL', async () => {
    const { cleanUp } = setupFieldPlugin()

    const { container, queryByTestId, getByTestId } = render(YoutubeVideoEmbed, {
      global: {
        components: {
          SbTextField
        }
      },
    }) // plugin.type === 'loading'
    await nextTick() // plugin.type === 'loaded'

    await fireEvent.update(getByTestId('input-link'), 'https://www.other-site.com/watch?v=dQw4w9WgXcQ')
    await nextTick()

    const errorMessageElement = container.querySelector('.sb-textfield__message--error')
    expect(errorMessageElement).not.toBeNull()
    expect(errorMessageElement?.textContent).toEqual("The YouTube link doesn't seem valid")

    expect(queryByTestId('video-embedder')).toBeNull()

    cleanUp()
  })
})
