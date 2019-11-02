export type LabyrinthSegment = {
  x: number
  y: number
  z: number
  path: string
}

export type Position = {
  x: number
  y: number
}

export type StoreState = {
  currentPosition: Position | null
  labyrinthSegments: Array<LabyrinthSegment>
  segmentsAtSelectedPosition: Array<LabyrinthSegment>
  tileSize: number
}
