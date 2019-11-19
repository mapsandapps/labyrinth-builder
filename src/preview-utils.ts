import { cloneDeep, countBy, findKey } from 'lodash'
import store from './store'
import { LabyrinthSegment, Position, PreviewState } from './store/types'
// TODO: edge cases:
// * crossing lines (i.e. four segments with same point)
// * loop (i.e. no clear start or end point)

let previewState: PreviewState = {
  segmentsToConsolidate: []
}

function getPointFrequencies(
): object | null { // TODO: type
  let segments = previewState.segmentsToConsolidate
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
  index: number
): void {
  let segments = previewState.segmentsToConsolidate
  // 2 TODO
}

function findSegmentWithPoint(
  point: Position
): number | null {
  let segments = previewState.segmentsToConsolidate
  segments.forEach((segment, index) => {
    console.log(segment)
    if (segment.x === point.x && segment.y === point.y && segment.z === point.z) {
      console.log(index)
      return index
    }
    if (segment.x1 === point.x && segment.y1 === point.y && segment.z1 === point.z) {
      console.log(index)
      reverseSegment(index)
      return index
    }
  })
  return null
}

export function consolidateSegments(
  segments: LabyrinthSegment[]
): boolean {
  previewState.segmentsToConsolidate = cloneDeep(segments)
  console.log(segments)
  // list all the points and how frequently they occur
  // start with one of the points that only occurs once
  // get the other point for that segment
  // find the other segment with that point
  // mark which ones need to be reversed

  const pointFrequencies = getPointFrequencies()
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
  findSegmentWithPoint(startingPoint)
  // TODO: 3 remove the segment found from segmentsToConsolidate; push it to the new consolidatedSegments, which should also live in the store

  return true
}
