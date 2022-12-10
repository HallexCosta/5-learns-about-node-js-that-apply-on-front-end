export default class View {
  updateTable(items) {
    const root = globalThis.document.getElementById('root')
    root.innerHTML = this.formatItems(items)
  }

  formatItems(items) {
    const toBold = ({
      name,
      isBold
    }) => isBold ? `<strong>${name}</strong>` : name

    return items
      .map(item => String.raw`
        <li>
          ${item.id} 
          <img src="${item.image}" width="50px" height="50px" />
          ${toBold(item)}
        </li>
      `).join('<br />')
  }
}
