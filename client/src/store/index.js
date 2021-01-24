import Vue from 'vue'
import Vuex from 'vuex'
import products from './modules/products'
import cart from './modules/cart'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    products,
    cart
  },
  state: {
    rate: 75
  },
  getters: {
    viewPrice: state => price => {
      const rate = state.rate
      return new Intl.NumberFormat('ru-RU', {
        currency: 'rub',
        style: 'currency'
      }).format(price * rate)
    }
  },
  mutations: {},
  actions: {}
})
