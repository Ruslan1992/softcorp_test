<template>
  <div :class="productClass">
    <div class="product_title mb-3">
      <h5 class="mb-1">{{ product.title }}</h5>
      <div class="text-muted small" v-if="product.count > 5">
        Количество: {{ product.count }}
      </div>
      <div v-else>
        <div class="text-danger"><strong>Количество ограничено</strong></div>
        <div class="text-muted small">Осталось: {{ product.count }} шт.</div>
      </div>
    </div>
    <div class="d-flex justify-content-between">
      <div :class="priceClass">
        {{ product.price }}
      </div>
      <div class="btn btn-sm ml-auto" @click="toggle">Редактировать</div>
      <div class="btn btn-sm btn-outline-secondary" @click="addToCart">
        Добавить в корзину
      </div>
    </div>
    <div class="product-edit pt-2 mt-2 border-top" v-if="show">
      <div class="row align-items-baseline">
        <div class="col-4">
          <label class="mb-0">
            Стоимость в USD
            <input
              type="number"
              class="form-control-sm form-control"
              v-model="newPrice"
            />
          </label>
        </div>
        <div class="col-4">
          <label class="mb-0">
            Количество товара
            <input
              type="number"
              class="form-control-sm form-control"
              v-model="newCount"
            />
          </label>
        </div>
        <div class="col-4">
          <div class="btn btn-sm btn-outline-primary mb-1" @click="editProduct">
            Сохранить
          </div>
        </div>
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
  data: function() {
    return {
      show: false,
      newPrice: this.$store.getters.getPriceInUSD(this.product.id),
      newCount: this.product.count
    }
  },
  methods: {
    addToCart() {
      this.$store.dispatch('addToCart', this.product.id)
    },
    toggle() {
      this.show = !this.show
    },
    editProduct() {
      this.$store.commit('statusLoading', true)
      this.show = false
      this.$store.dispatch('editProduct', {
        id: this.product.id,
        price: this.newPrice,
        count: this.newCount
      })
    }
  },
  computed: {
    productClass() {
      return this.product.count < 6
        ? 'product border few-product'
        : 'product border'
    },
    priceClass() {
      if (this.product.changePrice === 'more') {
        return 'product_price product_price_red'
      }
      if (this.product.changePrice === 'less') {
        return 'product_price product_price_green'
      }

      return 'product_price'
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
  &.product_price_red {
    color: rgb(187, 4, 4);
  }
  &.product_price_green {
    color: rgb(1, 82, 1);
  }
}
</style>
