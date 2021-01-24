import productsData from '../../mock/data.json'
import productsName from '../../mock/names.json'

const state = () => ({
  products: [],
  names: []
})

const mutations = {
  changeProducts: (state, payload) => {
    state.products = payload.Value.Goods
  },
  changeNames: (state, payload) => {
    state.names = payload
  }
}

const getters = {
  viewProducts: (state, _, rootState, rootGetters) => {
    const products = state.products
    const names = state.names
    const viewProducts = {}

    products.forEach(item => {
      const id = item.T
      const idGroup = item.G
      const price = item.C
      const number = item.P
      const title = names[idGroup].B[id].N
      const titleGroup = names[idGroup].G

      item = {
        id,
        price: rootGetters.viewPrice(price),
        number,
        title
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
  }
}

const actions = {
  getProducts: ({ commit }) => {
    const products = JSON.parse(JSON.stringify(productsData))
    const names = JSON.parse(JSON.stringify(productsName))
    commit('changeProducts', products)
    commit('changeNames', names)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
