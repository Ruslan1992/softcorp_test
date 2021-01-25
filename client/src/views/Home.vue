<template>
  <div class="container-fluid py-4">
    <Cart />
    <div class="products">
      <Group
        v-for="(value, name) in products"
        :key="value.id"
        :goods="value.goods"
        :title="name"
      />
    </div>
  </div>
</template>

<script>
import Group from '@/components/Group.vue'
import Cart from '@/components/Cart.vue'

export default {
  name: 'Home',
  components: {
    Group,
    Cart
  },
  created: function() {
    setInterval(async () => {
      await this.$store.dispatch('getProducts')
    }, 15000)
  },
  computed: {
    products() {
      return this.$store.getters.viewProducts
    }
  }
}
</script>

<style lang="scss">
.products {
  position: relative;
  column-count: 2;
  column-gap: 0;
}
</style>
