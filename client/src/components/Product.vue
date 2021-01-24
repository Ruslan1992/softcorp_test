<template>
  <div :class="productClass">
    <div class="product_title mb-3">
      <h5 class="mb-1">{{ product.title }}</h5>
      <div class="text-muted small" v-if="product.number > 5">
        Количество: {{ product.number }}
      </div>
      <div v-else>
        <div class="text-danger"><strong>Количество ограничено</strong></div>
        <div class="text-muted small">Осталось: {{ product.number }} шт.</div>
      </div>
    </div>
    <div class="d-flex justify-content-between">
      <div class="product_price">
        {{ product.price }}
      </div>
      <div class="btn btn-sm btn-outline-secondary" @click="addToCart">
        Добавить в корзину
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Product',
  props: {
    product: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  methods: {
    addToCart() {
      this.$store.dispatch('addToCart', this.product.id)
    }
  },
  computed: {
    productClass() {
      return this.product.number <= 6
        ? 'product border few-product'
        : 'product border'
    }
  }
}
</script>

<style lang="scss">
.product {
  padding: 10px 15px;
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0;
  }
  &.few-product {
    background: rgba(235, 196, 91, 0.3);
  }
}
.product_price {
  font-weight: 600;
  font-size: 20px;
}
</style>
