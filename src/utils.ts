import store from './store'

export function buildCurve(
  direction: string,
  radius: number,
  rotation: string
): string | undefined {
  let tileSize = store.state.tileSize
  let size = tileSize * radius

  let pathRotation = rotation === 'cw' ? 1 : 0

  let relativeXSign = direction === 'up-left' || direction === 'down-left' ? -1 : 1
  let relativeYSign = direction === 'up-left' || direction === 'up-right' ? -1 : 1

  let relativeEndX = relativeXSign * size
  let relativeEndY = relativeYSign * size

  return `a ${size},${size} 0 0,${pathRotation} ${relativeEndX},${relativeEndY}`
}

export function buildLine(

): string | undefined {
  return undefined
}
