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
  select: 'Select',
  options: 'Options',
}

export default {
  mixins: [widgeti18nMixin],
  components: {
    Select: () => import('./select'),
    Options: () => import('./options'),
  },
  computed: {
    selectType() {
      return selectTypeMap[
        this.localeArgLookup('selectType') || selectTypeMap.select
      ]
    },
  },
}
</script>

<style></style>
