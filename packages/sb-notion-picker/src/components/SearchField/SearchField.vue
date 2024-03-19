<template>
  <SbTextField
    id="example"
    :disabled="false"
    :placeholder="placeholder"
    :required="false"
    :value="modelValue"
    clearable
    icon-left="search"
    name="example"
    @input="handleInput($event.target.value)"
  />
</template>

<script>
export default {
  name: 'SearchField',
  props: {
    placeholder: {
      type: String,
      required: false,
      default: undefined,
    },
    modelValue: {
      type: String,
      required: false,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  watch: {
    value(newValue) {
      this.$emit('update:modelValue', newValue)
    },
  },
  methods: {
    handleInput(value) {
      this.$emit('update:modelValue', value || '')
    },
  },
}
</script>
