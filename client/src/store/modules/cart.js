const state = () => ({
  cart: []
})

const mutations = {
  cartFromLocalStorage: (state, payload) => {
    state.cart = payload
  },
  changeCart: (state, { product, n }) => {
    const id = product.T
    const price = product.C
    const maxCount = product.P

    const isProductInCart = state.cart.findIndex(item => {
      return item.id === id
    })

    if (isProductInCart === -1) {
      state.cart.push({
        id,
        count: 1,
        price,
        sum: price
      })
    } else {
      const count = n
        ? Math.min(maxCount, Math.max(1, n))
        : Math.min(maxCount, Math.max(1, state.cart[isProductInCart].count + 1))
      state.cart[isProductInCart].count = count
      state.cart[isProductInCart].sum =
        state.cart[isProductInCart].price * count
    }

    localStorage.setItem('cart', JSON.stringify(state.cart))
  },
  clearCart: state => {
    state.cart = []
  },
  removeFromCart: (state, payload) => {
    const cart = state.cart.filter(item => item.id !== payload)
    state.cart = cart
    localStorage.setItem('cart', JSON.stringify(state.cart))
  }
}

const getters = {
  cartProduct: (state, _, rootState, rootGetters) => id => {
    const products = rootState.products.products
    const names = rootState.products.names
    const productCart = state.cart.find(item => {
      return item.id === id
    })
    const product = products.find(item => {
      return item.T === id
    })

    const cartProduct = {
      id: productCart.id,
      title: names[product.G].B[id].N,
      group: names[product.G].G,
      price: rootGetters.viewPrice(productCart.price),
      sum: rootGetters.viewPrice(productCart.sum),
      totalCount: product.P
    }

    return cartProduct
  },
  cartSum: (state, _, rootState, rootGetters) => {
    const sum = state.cart.reduce((prev, curr) => {
      return prev + curr.sum
    }, 0)
    return rootGetters.viewPrice(sum)
  }
}

const actions = {
  addToCart: ({ commit, rootState }, payload) => {
    const product = rootState.products.products.find(item => {
      return item.T === payload
    })
    commit('changeCart', { product })
  },
  removeFromCart: ({ commit }, payload) => {
    commit('removeFromCart', payload)
  },
  clearCart: ({ commit }) => {
    commit('clearCart')
  },
  changeCount: ({ commit, rootState }, payload) => {
    const product = rootState.products.products.find(item => {
      return item.T === payload.id
    })
    commit('changeCart', { product, n: payload.count })
  },
  getCart: ({ commit }) => {
    const cart = localStorage.getItem('cart')
    if (cart) {
      commit('cartFromLocalStorage', JSON.parse(cart))
    }
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
