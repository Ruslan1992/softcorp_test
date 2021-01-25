//import productsData from '../../mock/data.json'
//import productsName from '../../mock/names.json'
import { useApi } from '@/api'

const state = () => ({
  products: [],
  names: []
})

const mutations = {
  changeProducts: (state, payload) => {
    state.products = payload
  },
  changeNames: (state, payload) => {
    state.names = payload
  }
}

const getters = {
  viewProducts: (state, _, rootState, rootGetters) => {
    const products = state.products
    const viewProducts = {}

    products.forEach(item => {
      const id = item.id
      const idGroup = item.idGroup
      const price = item.price
      const count = item.count
      const title = item.title
      const titleGroup = item.titleGroup
      const changePrice = item.changePrice

      item = {
        id,
        price: rootGetters.viewPrice(price),
        count,
        title,
        changePrice
      }

      if (!viewProducts[titleGroup]) {
        viewProducts[titleGroup] = {
          id: idGroup,
          goods: [item]
        }
      } else {
        viewProducts[titleGroup].goods.push(item)
      }
    })

    return viewProducts
  },
  getPriceInUSD: state => id => {
    const product = state.products.find(item => {
      return item.id === id
    })
    return product.price
  }
}

const actions = {
  getProducts: async ({ commit }) => {
    const products = await useApi('getProducts')
    commit('changeProducts', products)
    commit('statusLoading', false)
  },
  editProduct: async (context, payload) => {
    await useApi('editProduct', 'post', payload)
    context.dispatch('getProducts')
    context.dispatch('showMessage', 'Продукт успешно изменен')
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
