<template>
  <component
    :is="selectType"
    v-bind="{ ...$props, ...$attrs }"
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
  components: {
    default: () => import('./multi-select'),
    options: () => import('./options'),
  },
  computed: {
    selectType() {
      return selectTypeMap[
        this.localeArgLookup('selectType') || selectTypeMap.default
      ]
    },
  },
}
</script>

<style></style>
