const fs = require('fs')
const path = require('path')

async function getData() {
  const data = await new Promise((resolve, reject) => {
    fs.readFile(
      path.join(__dirname, '..', 'data', 'data.json'),
      'utf-8',
      (err, content) => {
        if (err) {
          reject(err)
        } else {
          resolve(JSON.parse(content))
        }
      }
    )
  })
  const names = await new Promise((resolve, reject) => {
    fs.readFile(
      path.join(__dirname, '..', 'data', 'names.json'),
      'utf-8',
      (err, content) => {
        if (err) {
          reject(err)
        } else {
          resolve(JSON.parse(content))
        }
      }
    )
  })

  return {
    data,
    names
  }
}

module.exports = {
  async editProduct(id, price, count) {
    const {data} = await getData()
    const products = data.Value.Goods
    const productIdx = products.findIndex(item => {
      return item.T === id
    })
    
    if(products[productIdx].C > price) {      
      products[productIdx].CV = 'less'
    } 
    if(products[productIdx].C < price) {     
      products[productIdx].CV = 'more'
    }

    products[productIdx].P = count
    products[productIdx].C = price

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'data.json'),
        JSON.stringify(data),
        (err) => {
          if (err) {
            reject(err)
          } else {
            resolve(true)
          }
        }
      )
    })
  },
  async getProducts() {
    const {data, names} = await getData()

    const products = data.Value.Goods

    return products.map(item => {

      const id = item.T
      const idGroup = item.G
      const title = names[idGroup].B[id].N
      const titleGroup =  names[idGroup].G
      const price = item.C
      const count = item.P      
      const changePrice = item.CV ? item.CV : 'same'

      return { id, idGroup, title, titleGroup, price, count, changePrice }

    })
  }
}