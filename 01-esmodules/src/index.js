import config from './config.json' assert { type: 'json' }
import Service from './service.js'

const service = new Service({
  url: config.url
})

const chars = await service.getCharacters({
  skip: 0,
  limit: 5
})

const boldSmith = (name) => /smith/i.test(name) ? `<strong>${name}</strong>` : name
const charsHTML = chars
  .map(char => String.raw`
    <li>
      ${char.id} 
      <img src="${char.image}" width="50px" height="50px" />
      ${boldSmith(char.name)}
    </li>
  `).join('<br />')

const root = document.getElementById('root')
root.innerHTML = charsHTML

