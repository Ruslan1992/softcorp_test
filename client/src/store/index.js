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
    rate: {
      value: 75
    },
    loading: true,
    message: null
  },
  mutations: {
    changeRate: (state, payload) => {
      state.rate.value = Math.min(80, Math.max(20, payload))
    },
    addMessage: (state, payload) => {
      state.message = payload
    },
    removeMessage: state => {
      state.message = null
    },
    statusLoading: (state, payload) => {
      state.loading = payload
    }
  },
  getters: {
    viewPrice: state => price => {
      const rate = state.rate.value
      return new Intl.NumberFormat('ru-RU', {
        currency: 'rub',
        style: 'currency'
      }).format(price * rate)
    },
    getRate: state => {
      return state.rate
    }
  },
  actions: {
    changeRate: ({ commit }, payload) => {
      commit('changeRate', payload)
    },

    showMessage: (context, payload) => {
      context.commit('addMessage', payload)
      setTimeout(() => {
        context.commit('removeMessage')
      }, 3000)
    }
  }
})
