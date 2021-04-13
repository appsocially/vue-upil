<template>
  <component
    :is="selectType"
    v-bind="{ ...$props, ...$attrs, state }"
    v-on="$listeners"
  />
</template>

<script>
import widgeti18nMixin from '@/components/widgeti18nMixin'

const selectTypeMap = {
  default: 'default',
  options: 'options',
}

export default {
  mixins: [widgeti18nMixin],
  props: {
    state: {
      type: Object,
    },
  },
  components: {
    default: () => import('./select'),
    options: () => import('./options'),
  },
  computed: {
    settings() {
      return this.state.settings
    },
    selectType() {
      const defaultSelectType =
        this.settings.defaultSelectType || selectTypeMap.default
      return selectTypeMap[
        this.localeArgLookup('selectType') || defaultSelectType
      ]
    },
  },
}
</script>

<style></style>
