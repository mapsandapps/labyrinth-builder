import { countBy, findKey } from 'lodash'
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

// TODO: edge cases:
// * crossing lines (i.e. four segments with same point)
// * loop (i.e. no clear start or end point)

function getPointFrequencies(
  segments: LabyrinthSegment[]
): object | null { // TODO: type
  let pointOccurrences: any = []
  segments.map(s => {
    pointOccurrences.push([s.x, s.y, s.z])
    pointOccurrences.push([s.x1, s.y1, s.z1])
  })

  // for now, there should be two points present once (the ends)
  // and all other points should be present twice
  const frequenciesOfPoints = countBy(countBy(pointOccurrences))
  if (!frequenciesOfPoints[1]) {
    store.commit('setError', 'You have a complete loop, which is currently unallowed. Please make sure that the labyrinth has two ends.')
    return null
  } else if (frequenciesOfPoints[1] !== 2) {
    store.commit('setError', 'One or more pieces cannot connect.')
    return null
  }
  if (!frequenciesOfPoints[2]) {
    store.commit('setError', 'None of your lines connect')
    return null
  }
  if (frequenciesOfPoints.length > 2) {
    store.commit('setError', 'You have lines that cross, which is currently unallowed.')
    return null
  }

  return countBy(pointOccurrences)
}

function findStartingPoint( // technically could be used to find any point with just one occurrence
  pointFrequencies: object
): Position | null {
  const pointAsString = findKey(pointFrequencies, o => {
    return o === 1
  })
  if (!pointAsString) return null // should never happen

  const [x, y, z] = pointAsString.split(',')
  return { x: Number(x), y: Number(y), z: Number(z) }
}

function reverseSegment(
  segments: LabyrinthSegment[],
  index: number
): void {
  // 2 TODO
}

// TODO: 1 remove segments as a prop for all these, clone segments as segmentsToConsolidate in store
function findSegmentWithPoint(
  segments: LabyrinthSegment[],
  point: Position
): number | null {
  segments.forEach((segment, index) => {
    console.log(segment)
    if (segment.x === point.x && segment.y === point.y && segment.z === point.z) {
      console.log(index)
      return index
    }
    if (segment.x1 === point.x && segment.y1 === point.y && segment.z1 === point.z) {
      console.log(index)
      reverseSegment(segments, index)
      return index
    }
  })
  return null
}

export function consolidateSegments(
  segments: LabyrinthSegment[]
): boolean {
  console.log(segments)
  // list all the points and how frequently they occur
  // start with one of the points that only occurs once
  // get the other point for that segment
  // find the other segment with that point
  // mark which ones need to be reversed

  const pointFrequencies = getPointFrequencies(segments)
  console.log(pointFrequencies)
  if (!pointFrequencies) {
    store.commit('setError', 'something wrong with pointFrequencies')
    return false
  }
  const startingPoint = findStartingPoint(pointFrequencies)
  if (!startingPoint) {
    store.commit('setError', 'something wrong with startingPoint')
    return false
  }
  findSegmentWithPoint(segments, startingPoint)
  // TODO: 3 remove the segment found from segmentsToConsolidate; push it to the new consolidatedSegments, which should also live in the store

  return true
}
