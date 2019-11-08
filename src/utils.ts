import store from './store'

export function buildCurve(
  direction: string,
  radius: number,
  rotation: string
): string | undefined {
  let tileSize = store.state.tileSize
  let size = tileSize * radius

  let pathRotation = rotation === 'cw' ? 1 : 0

  let relativeSignX = direction === 'up-left' || direction === 'down-left' ? -1 : 1
  let relativeSignY = direction === 'up-left' || direction === 'up-right' ? -1 : 1

  let relativeEndX = relativeSignX * size
  let relativeEndY = relativeSignY * size

  return `a ${size},${size} 0 0,${pathRotation} ${relativeEndX},${relativeEndY}`
}

export function buildLine(
  direction: string,
  height: number = 0,
  width: number = 0
): string | undefined {
  let tileSize = store.state.tileSize

  let relativeSignX = direction === 'left' || direction === 'up-left' || direction === 'down-left' ? -1 : 1
  let relativeSignY = direction === 'up' || direction === 'up-left' || direction === 'up-right' ? -1 : 1

  let relativeEndX = relativeSignX * width * tileSize
  let relativeEndY = relativeSignY * height * tileSize

  return `l ${relativeEndX},${relativeEndY}`
}
