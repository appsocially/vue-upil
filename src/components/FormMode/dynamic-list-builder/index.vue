<template>
  <component
    :is="dynamicListBuilderType"
    v-bind="{ ...$props, ...$attrs }"
    v-on="$listeners"
  />
</template>

<script>
import widgeti18nMixin from '@/components/widgeti18nMixin'

const dynamicListBuilderType = {
  default: 'default',
  editable: 'editable',
}

export default {
  mixins: [widgeti18nMixin],
  components: {
    default: () => import('./default'),
    editable: () => import('./editable'),
  },
  computed: {
    dynamicListBuilderType() {
      return this.localeArgLookup('editable') === true
        ? dynamicListBuilderType.editable
        : dynamicListBuilderType.default
    },
  },
}
</script>

<style></style>
