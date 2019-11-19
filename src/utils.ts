import store from './store'
import { LabyrinthSegment, Position, Rotation } from './store/types'

export function buildCurve(
  position: Position,
  direction: string,
  radius: number,
  rotation: Rotation
): LabyrinthSegment {
  let tileSize = store.state.TILE_SIZE
  let size = tileSize * radius

  let pathRotation = rotation === Rotation.CW ? 1 : 0

  let relativeSignX = direction === 'up-left' || direction === 'down-left' ? -1 : 1
  let relativeSignY = direction === 'up-left' || direction === 'up-right' ? -1 : 1

  let relativeEndX = relativeSignX * size
  let relativeEndY = relativeSignY * size

  return {
    ...position,
    x1: position.x + relativeEndX,
    y1: position.y + relativeEndY,
    z1: position.z,
    path: `a ${size},${size} 0 0,${pathRotation} ${relativeEndX},${relativeEndY}`
  }
}

export function buildLine(
  position: Position,
  direction: string,
  height: number = 0,
  width: number = 0
): LabyrinthSegment {
  let tileSize = store.state.TILE_SIZE

  let relativeSignX = direction === 'left' || direction === 'up-left' || direction === 'down-left' ? -1 : 1
  let relativeSignY = direction === 'up' || direction === 'up-left' || direction === 'up-right' ? -1 : 1

  let relativeEndX = relativeSignX * width * tileSize
  let relativeEndY = relativeSignY * height * tileSize

  return {
    ...position,
    x1: position.x + relativeEndX,
    y1: position.y + relativeEndY,
    z1: position.z,
    path: `l ${relativeEndX},${relativeEndY}`
  }
}

export function validateSegment(
  type: string,
  direction: string,
  height?: number,
  radius?: number,
  rotation?: Rotation,
  width?: number
): boolean {
  if (type === 'curve' && radius && radius > 0) {
    if (direction === 'up-right' || direction === 'up-left' || direction === 'down-right' || direction === 'down-left') {
      if (rotation === Rotation.CCW || rotation === Rotation.CW) {
        return true
      }
    }
  } else if (type === 'line' && width && height && width > 0 && height > 0) {
    // angled line
    if (direction === 'up-left' || direction === 'up-right' || direction === 'down-left' || direction === 'down-right') {
      return true
    }
  } else if (type === 'line' && ((width && width > 0) || (height && height > 0))) {
    // vertical or horizontal line
    if (direction === 'up' || direction === 'down' || direction === 'left' || direction === 'right') {
      return true
    }
  }
  return false
}

