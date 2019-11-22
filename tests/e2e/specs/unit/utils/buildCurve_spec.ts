import { types, utils } from './imports'

const buildCurve = utils.buildCurve

describe('utils > buildCurve', () => {
  it('up-right CCW', () => {
    const position = { x: 64, y: 64, z: 0 }
    const direction = 'up-right'
    const radius = 1
    const rotation = types.Rotation.CCW
    expect(buildCurve(position, direction, radius, rotation))
      .to.deep.eq({
        ...position,
        x1: 128,
        y1: 0,
        z1: 0,
        path: `a 64,64 0 0,0 64,-64`
      })
  })
  it('up-left CCW', () => {
    const position = { x: 64, y: 64, z: 0 }
    const direction = 'up-left'
    const radius = 1
    const rotation = types.Rotation.CCW
    expect(buildCurve(position, direction, radius, rotation))
      .to.deep.eq({
        ...position,
        x1: 0,
        y1: 0,
        z1: 0,
        path: `a 64,64 0 0,0 -64,-64`
      })
  })
  it('down-right CCW', () => {
    const position = { x: 64, y: 64, z: 0 }
    const direction = 'down-right'
    const radius = 1
    const rotation = types.Rotation.CCW
    expect(buildCurve(position, direction, radius, rotation))
      .to.deep.eq({
        ...position,
        x1: 128,
        y1: 128,
        z1: 0,
        path: `a 64,64 0 0,0 64,64`
      })
  })
  it('down-left CCW', () => {
    const position = { x: 64, y: 64, z: 0 }
    const direction = 'down-left'
    const radius = 1
    const rotation = types.Rotation.CCW
    expect(buildCurve(position, direction, radius, rotation))
      .to.deep.eq({
        ...position,
        x1: 0,
        y1: 128,
        z1: 0,
        path: `a 64,64 0 0,0 -64,64`
      })
  })
  it('up-right CW', () => {
    const position = { x: 64, y: 64, z: 0 }
    const direction = 'up-right'
    const radius = 1
    const rotation = types.Rotation.CW
    expect(buildCurve(position, direction, radius, rotation))
      .to.deep.eq({
        ...position,
        x1: 128,
        y1: 0,
        z1: 0,
        path: `a 64,64 0 0,1 64,-64`
      })
  })
  it('up-left CW', () => {
    const position = { x: 64, y: 64, z: 0 }
    const direction = 'up-left'
    const radius = 1
    const rotation = types.Rotation.CW
    expect(buildCurve(position, direction, radius, rotation))
      .to.deep.eq({
        ...position,
        x1: 0,
        y1: 0,
        z1: 0,
        path: `a 64,64 0 0,1 -64,-64`
      })
  })
  it('down-right CW', () => {
    const position = { x: 64, y: 64, z: 0 }
    const direction = 'down-right'
    const radius = 1
    const rotation = types.Rotation.CW
    expect(buildCurve(position, direction, radius, rotation))
      .to.deep.eq({
        ...position,
        x1: 128,
        y1: 128,
        z1: 0,
        path: `a 64,64 0 0,1 64,64`
      })
  })
  it('down-left CW', () => {
    const position = { x: 64, y: 64, z: 0 }
    const direction = 'down-left'
    const radius = 1
    const rotation = types.Rotation.CW
    expect(buildCurve(position, direction, radius, rotation))
      .to.deep.eq({
        ...position,
        x1: 0,
        y1: 128,
        z1: 0,
        path: `a 64,64 0 0,1 -64,64`
      })
  })
  it('radius of 2', () => {
    const position = { x: 128, y: 128, z: 0 }
    const direction = 'up-right'
    const radius = 2
    const rotation = types.Rotation.CCW
    expect(buildCurve(position, direction, radius, rotation))
      .to.deep.eq({
        x: 128,
        y: 128,
        z: 0,
        x1: 256,
        y1: 0,
        z1: 0,
        path: `a 128,128 0 0,0 128,-128`
      })
  })
})
