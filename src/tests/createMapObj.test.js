import createMapObj from "../assists/createMapObj"

const mapTestObj = {
  name: 'testMap',
  url: 'testUrl',
  miniUrl: 'testMiniUrl'
}

describe('createMapObj factory', () => {
  it('Creates an Objet with name, url, miniUrl keys', () => {
    const firstMap = createMapObj('testMap', 'testUrl', 'testMiniUrl')
    expect(firstMap).toEqual(mapTestObj)
  })
})