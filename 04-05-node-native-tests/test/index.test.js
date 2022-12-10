import { describe, it } from 'node:test'
import { deepStrictEqual, CallTracker } from 'node:assert'
import Controller from '../src/controller.js'
import View from '../src/view.js'

const tracker = new CallTracker()
process.on('exit', () => tracker.verify())

const mockedData = [
  {
    id: 0,
    name: 'Morty Smith',
    image: 'https://',
    age: 15,
    birthDay: new Date()
  },
  {
    id: 0,
    name: 'Pickle Rick',
    image: 'https://',
    age: 55,
    birthDay: new Date()
  }
]

describe('Unit tests for frontend', () => {
  it('should add a property if name contains smith and remove all other props', () => {
    const expected = [
      {
        id: 0,
        name: 'Morty Smith',
        image: 'https://',
        isBold: true
      },
      {
        id: 0,
        name: 'Pickle Rick',
        image: 'https://',
        isBold: false
      }
    ]
    const controller = new Controller({
      service: {},
      view: {}
    })

    const result = controller.prepareItems(mockedData)
    deepStrictEqual(result, expected)
  })
  it('should verify either all functions were called properly', async () => {
    let htmlResult = ''
    const globalObject = {
      document: {
        getElementById: tracker.calls(() => {
          return {
            set innerHTML(value) {
              htmlResult = value
            }
          }
        })
      }
    }
    globalThis = {
      ...globalThis,
      ...globalObject
    }

    const view = new View()
    view.updateTable = tracker.calls(view.updateTable)

    const service = {
      getCharacters: tracker.calls(() => mockedData)
    }

    await Controller.initialize({
      service,
      view
    })

    const [{ arguments: serviceCall }] = tracker.getCalls(service.getCharacters)
    const expectedServiceCall = [
      {
        skip: 0,
        limit: 5
      }
    ]
    deepStrictEqual(serviceCall, expectedServiceCall)

    const [{ arguments: viewCall }] = tracker.getCalls(view.updateTable)
    const items = [
      {
        id: 0,
        name: 'Morty Smith',
        image: 'https://',
        isBold: true
      },
      {
        id: 0,
        name: 'Pickle Rick',
        image: 'https://',
        isBold: false
      }
    ]
    const expectedViewCall = [
      items      
    ]
    deepStrictEqual(viewCall, expectedViewCall)
    const expectedHTMLResult = String.raw`
        <li>
          0 
          <img src="https://" width="50px" height="50px" />
          <strong>Morty Smith</strong>
        </li>
      <br />
        <li>
          0 
          <img src="https://" width="50px" height="50px" />
          Pickle Rick
        </li>
      `

    deepStrictEqual(htmlResult, expectedHTMLResult)
  })
})
