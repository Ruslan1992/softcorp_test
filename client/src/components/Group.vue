<template>
  <div class="group_container p-3">
    <div class="card">
      <div class="card-header bg-seccondary">
        <h5 class="m-0">{{ title }}</h5>
      </div>
      <div class="card-body">
        <Product v-for="good in goods" :key="good.id" :product="good" />
      </div>
    </div>
  </div>
</template>

<script>
import Product from '@/components/Product.vue'

export default {
  name: 'Group',
  components: {
    Product
  },
  props: {
    title: {
      type: String,
      required: true,
      default: () => {}
    },
    goods: {
      type: Array,
      required: true,
      default: () => {}
    }
  }
}
</script>

<style lang="scss">
.group_container {
  page-break-inside: avoid;
  break-inside: avoid;
}
</style>
