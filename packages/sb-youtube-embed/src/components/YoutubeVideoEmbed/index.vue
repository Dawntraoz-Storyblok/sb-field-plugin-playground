<script setup lang="ts">
import { computed, watch } from 'vue'
import { useFieldPlugin } from '@storyblok/field-plugin/vue3'
import type { Video } from '../../types'
import VideoEmbed from './VideoEmbed.vue'

const pluginName = 'sb-youtube-embed'
const plugin = useFieldPlugin()

const youtubePluginData = computed<Video>(() => {
  const content = plugin.data?.content as Video
  return typeof content === 'object' ? content : { plugin: pluginName }
})

function extractYouTubeVideoId(url: string) {
  const regex =
    /(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^?&"'>]+)/
  const matches = url.match(regex)
  return matches ? matches[5] : ''
}

const setYoutubePluginData = (url: string) => {
  plugin.actions?.setContent({
    ...(plugin.data?.content ? { ...plugin.data.content } : {}),
    id: extractYouTubeVideoId(url),
    rawURL: url,
  })
}
</script>

<template>
  <div v-if="plugin.type === 'loaded'">
    <SbTextField
      id="youtube-video-link"
      data-testid="input-link"
      class="sb-mb-3 font-14"
      placeholder="Add your YouTube video URL"
      :error="
        youtubePluginData.rawURL &&
        extractYouTubeVideoId(youtubePluginData.rawURL ?? '') === ''
      "
      error-message="The YouTube link doesn't seem valid"
      :nativeValue="youtubePluginData.rawURL"
      :modelValue="youtubePluginData.rawURL"
      @update:modelValue="setYoutubePluginData($event)"
    />
    <VideoEmbed
      v-if="youtubePluginData.id"
      :video-id="youtubePluginData.id"
      data-testid="video-embedder"
    />
  </div>
</template>
