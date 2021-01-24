<template>
  <div class="card cart m-3">
    <div class="card-header bg-dark text-white">
      <h4>Корзина</h4>
    </div>
    <div v-if="!cart.length" class="card-body">
      корзина пуста
    </div>
    <div v-else>
      <table class="table mb-0">
        <thead>
          <tr>
            <th class="border-0 cart-product-title" scope="col">
              Наименование товара и описание
            </th>
            <th class="border-0" scope="col">Количество</th>
            <th class="border-0" scope="col">Цена</th>
            <th class="border-0" scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <CartItem
            v-for="cartItem in cart"
            :key="cartItem.id"
            :cartItem="cartItem"
          />
        </tbody>
      </table>
      <div class="card-footer">
        <div class="d-flex justify-content-between align-items-center">
          <div class="sum">
            Общая стоимость: <strong> {{ price }}</strong>
          </div>
          <div class="btn btn-outline-danger btn-sm" @click="clearCart">
            Очистить корзину
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartItem from '@/components/CartItem.vue'

export default {
  name: 'Cart',
  components: {
    CartItem
  },
  methods: {
    clearCart() {
      this.$store.dispatch('clearCart')
    }
  },
  computed: {
    cart() {
      return this.$store.state.cart.cart
    },
    price() {
      return this.$store.getters.cartSum
    }
  }
}
</script>

<style lang="scss">
.cart-product-title {
  width: 500px;
}
</style>
