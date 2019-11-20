import { cloneDeep, countBy, findKey, last } from 'lodash'
import store from './store'
import { LabyrinthSegment, Position, PreviewState } from './store/types'
// TODO: edge cases:
// * crossing lines (i.e. four segments with same point)
// * loop (i.e. no clear start or end point)

let previewState: PreviewState = {
  consolidatedSegments: [],
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

function reverseCurve(
  path: string
): string {
  let pathBits = path.split(' ')
  let [xChange, yChange] = pathBits[4].split(',')

  return `a ${pathBits[1]} ${pathBits[2]} ${pathBits[3]} ${Number(xChange) * -1},${Number(yChange) * -1}`
}

function reverseLine(
  path: string
): string {
  let [xChange, yChange] = path.split(' ')[1].split(',')

  return `l ${Number(xChange) * -1},${Number(yChange) * -1}`
}

function reverseSegment(
  segment: LabyrinthSegment
): LabyrinthSegment {
  let reversedSegment = {
    x: segment.x1,
    y: segment.y1,
    z: segment.z1,
    x1: segment.x,
    y1: segment.y,
    z1: segment.z,
    path: ''
  }

  if (segment.path.split(' ')[0] === 'a') {
    reversedSegment.path = reverseCurve(segment.path)
  } else if (segment.path.split(' ')[0] === 'l') {
    reversedSegment.path = reverseLine(segment.path)
  }

  return reversedSegment
}

function consolidateSegment(
  index: number,
  reverse: Boolean = false
): void {
  const segments = previewState.segmentsToConsolidate
  let segment = cloneDeep(segments[index])

  if (reverse) {
    segment = reverseSegment(segment)
  }

  previewState.consolidatedSegments.push(segment)
  previewState.segmentsToConsolidate.splice(index, 1)
}

function findSegmentWithPoint(
  point: Position
): number | null {
  let segments = previewState.segmentsToConsolidate
  segments.forEach((segment, index) => {
    if (segment.x === point.x && segment.y === point.y && segment.z === point.z) {
      consolidateSegment(index, false)
      return index
    }
    if (segment.x1 === point.x && segment.y1 === point.y && segment.z1 === point.z) {
      consolidateSegment(index, true)
      return index
    }
  })
  return null
}

function createPathFromSegments(): string {
  const segments = previewState.consolidatedSegments
  const firstSegment = segments[0]
  let path = `M ${firstSegment.x},${firstSegment.y}`
  segments.forEach(segment => {
    path += ` ${segment.path}`
  })

  return path
}

function reset() {
  previewState.consolidatedSegments = []
  previewState.segmentsToConsolidate = []
  store.commit('setError', null)
  store.commit('setLabyrinthPath', null)
  store.commit('setSuccess', null)
}

export function consolidateSegments(
  segments: LabyrinthSegment[]
): void {
  reset()
  previewState.segmentsToConsolidate = cloneDeep(segments)
  // list all the points and how frequently they occur
  // start with one of the points that only occurs once
  // get the other point for that segment
  // find the other segment with that point
  // mark which ones need to be reversed

  const pointFrequencies = getPointFrequencies()
  if (!pointFrequencies) {
    store.commit('setError', 'something wrong with pointFrequencies')
    return
  }
  const startingPoint = findStartingPoint(pointFrequencies)
  if (!startingPoint) {
    store.commit('setError', 'something wrong with startingPoint')
    return
  }
  findSegmentWithPoint(startingPoint)

  // while there are still segments in segmentsToConsolidate,
  // findSegmentWithPoint(endPointOfLastConsolidatedSegment)

  let loops = 1
  while (previewState.segmentsToConsolidate.length > 0) {
    if (loops % 20 === 0) {
      console.warn(`executed ${loops} loops`)
    }
    if (loops % 500 === 0) {
      store.commit('setError', `Executed ${loops} loops. You probably want to refresh the page at this point.`)
    }
    let lastSegment = last(previewState.consolidatedSegments)
    if (lastSegment) {
      findSegmentWithPoint({
        x: lastSegment.x1,
        y: lastSegment.y1,
        z: lastSegment.z1
      })
    }
    loops++
  }

  const labyrinthPath = createPathFromSegments()
  store.commit('setLabyrinthPath', labyrinthPath)
  store.commit('setSuccess', labyrinthPath)
}
