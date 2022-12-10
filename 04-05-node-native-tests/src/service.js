export default class Service {
  constructor({ url }) {
    this.url = url
  }

  async getCharacters({ skip, limit }) {
    let data = []
    const currentLocalStorageData = localStorage.getItem('characters')
    if (currentLocalStorageData) {
      data = JSON.parse(currentLocalStorageData)
      return data.splice(skip, limit)
    }
    data = (await (await fetch(this.url)).json()).results
    localStorage.setItem('characters', JSON.stringify(data))
    return data.splice(skip, limit)
  }
}
