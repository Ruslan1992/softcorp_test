<template>
  <div id="app">
    <Navbar />
    <div class="page_body">
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
    </div>
    <!-- <router-view /> -->
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Group from '@/components/Group.vue'
import Cart from '@/components/Cart.vue'

export default {
  components: {
    Navbar,
    Group,
    Cart
  },
  computed: {
    products() {
      return this.$store.getters.viewProducts
    }
  }
}
</script>

<style lang="scss">
@import url('https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css');
.products {
  position: relative;
  column-count: 2;
  column-gap: 0;
}
</style>
