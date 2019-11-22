import { utils } from './imports'

const buildLine = utils.buildLine

describe('utils > buildLine', () => {
  it('up', () => {
    const position = { x: 64, y: 64, z: 0 }
    const direction = 'up'
    const height = 1
    const width = 0
    expect(buildLine(position, direction, height, width))
      .to.deep.eq({
        ...position,
        x1: 64,
        y1: 0,
        z1: 0,
        path: `l 0,-64`
      })
  })
  it('down', () => {
    const position = { x: 64, y: 64, z: 0 }
    const direction = 'down'
    const height = 1
    const width = 0
    expect(buildLine(position, direction, height, width))
      .to.deep.eq({
        ...position,
        x1: 64,
        y1: 128,
        z1: 0,
        path: `l 0,64`
      })
  })
  it('left', () => {
    const position = { x: 64, y: 64, z: 0 }
    const direction = 'left'
    const height = 0
    const width = 1
    expect(buildLine(position, direction, height, width))
      .to.deep.eq({
        ...position,
        x1: 0,
        y1: 64,
        z1: 0,
        path: `l -64,0`
      })
  })
  it('right', () => {
    const position = { x: 64, y: 64, z: 0 }
    const direction = 'right'
    const height = 0
    const width = 1
    expect(buildLine(position, direction, height, width))
      .to.deep.eq({
        ...position,
        x1: 128,
        y1: 64,
        z1: 0,
        path: `l 64,0`
      })
  })
  it('2x', () => {
    const position = { x: 64, y: 64, z: 0 }
    const direction = 'down'
    const height = 2
    const width = 0
    expect(buildLine(position, direction, height, width))
      .to.deep.eq({
        ...position,
        x1: 64,
        y1: 192,
        z1: 0,
        path: `l 0,128`
      })
  })
  it('diagonal 45º', () => {
    const position = { x: 64, y: 64, z: 0 }
    const direction = 'up-right'
    const height = 1
    const width = 1
    expect(buildLine(position, direction, height, width))
      .to.deep.eq({
        ...position,
        x1: 128,
        y1: 0,
        z1: 0,
        path: `l 64,-64`
      })
  })
  it('diagonal not 45º', () => {
    const position = { x: 64, y: 64, z: 0 }
    const direction = 'up-right'
    const height = 1
    const width = 2
    expect(buildLine(position, direction, height, width))
      .to.deep.eq({
        ...position,
        x1: 192,
        y1: 0,
        z1: 0,
        path: `l 128,-64`
      })
  })
})
