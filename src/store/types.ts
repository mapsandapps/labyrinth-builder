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

export enum Rotation {
  CCW = "CCW",
  CW = "CW"
}

export enum Stage {
  Starting = "STARTING",
  Adding = "ADDING",
  Editing = "EDITING"
}

export type StoreState = {
  builderStage: Stage
  currentPosition: Position | null
  currentSegment: LabyrinthSegment | null
  currentSegmentIndex: number | null
  labyrinthSegments: Array<LabyrinthSegment>
  segmentsAtSelectedPosition: Array<LabyrinthSegment>
  tileSize: number
}
