export default class Controller {
  constructor(deps) {
    Object.assign(this, deps)
  }

  static async initialize(deps) {
    const controller = new Controller(deps)
    await controller.init()
  }

  async init() {
    const chars = await this.service.getCharacters({
      skip: 0,
      limit: 5
    })
    const data = this.prepareItems(chars)
    this.view.updateTable(data)
  }

  prepareItems(items) {
    return items.map(char => {
      return {
        ...char,
        isBold: /smith/i.test(char.name)
      }
    })

  }
}
