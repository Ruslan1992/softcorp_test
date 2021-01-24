<template>
  <tr>
    <td class="align-middle">
      <strong>{{ product.group }}</strong> / {{ product.title }}
    </td>
    <td class="align-middle">
      <div class="d-flex align-items-center">
        <input
          type="number"
          class="form-control form-control-sm counter"
          v-model="cartItem.count"
          @change="changeCount"
        />
        <span>шт</span>
      </div>
      <div v-if="product.totalCount < 6" class="border mt-2 p-2 warning">
        <div class="text-danger small">
          <strong>Количество ограничено</strong>
        </div>
        <div class="text-muted small">
          Осталось: {{ product.totalCount }} шт.
        </div>
      </div>
    </td>
    <td class="align-middle">
      <strong>{{ product.sum }}</strong>
      <div class="text-muted small">{{ product.price }} / шт</div>
    </td>

    <td class="align-middle">
      <div class="btn btn-sm btn-outline-secondary" @click="removeFromCart">
        Удалить из корзины
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'CartItem',
  props: {
    cartItem: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  methods: {
    removeFromCart() {
      this.$store.dispatch('removeFromCart', this.cartItem.id)
    },
    changeCount(e) {
      this.$store.dispatch('changeCount', {
        id: this.cartItem.id,
        count: e.target.value
      })
    }
  },
  computed: {
    product() {
      return this.$store.getters.cartProduct(this.cartItem.id)
    }
  }
}
</script>

<style lang="scss">
.form-control.counter {
  width: 70px;
  margin-right: 10px;
}
.warning {
  background: rgba(235, 196, 91, 0.3);
}
</style>
