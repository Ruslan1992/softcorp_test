export const useApi = async (url, method = 'get', query) => {
  try {
    let body = null
    if (query) {
      body = JSON.stringify(query)
    }
    const data = await fetch(`http://localhost:5000/api/${url}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body
    })

    return await data.json()
  } catch (error) {
    console.log(error)
  }
}
