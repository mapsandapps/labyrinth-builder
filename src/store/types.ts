export type Position = { // TODO: move to types.ts file
  x: number
  y: number
}

export type LabyrinthSegment = {
  x: number
  y: number
  z: number
  path: string
}

export type StoreState = {
  labyrinthSegments: Array<LabyrinthSegment>
  nextSegmentPosition: Position | null
  segmentsAtSelectedPosition: Array<LabyrinthSegment>
  tileSize: number
}
