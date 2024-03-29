import './style.css'
import { createApp } from 'vue'
import App from './App.vue'

/* Design System - Import */
import BlokInk from '@storyblok/design-system'
import '@storyblok/design-system/dist/storyblok-design-system.css'

if (!document.querySelector('#app')) {
  // In production, `#app` may or may not exist.
  const rootElement = document.createElement('div')
  rootElement.id = 'app'
  document.body.appendChild(rootElement)
}
const app = createApp(App)

/* Design System - Include only used components to the Vue instance */
app.use(BlokInk, {
  withComponents: [
    'SbTextField',
  ]
})

app.mount('#app')

// This error replaces another error which message is harder to understand and impossible to avoid util the issue https://github.com/storyblok/field-plugin/issues/107 has been resolved.
throw new Error(
  `This error can be safely ignored. It is caused by the legacy field plugin API. See issue https://github.com/storyblok/field-plugin/issues/107`,
)
