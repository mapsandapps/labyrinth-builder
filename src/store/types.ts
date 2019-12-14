export type LabyrinthSegment = {
  x: number
  x1: number
  y: number
  y1: number
  z: number
  z1: number
  path: string
}

export type Position = {
  x: number
  y: number
  z: number
}

export enum Rotation {
  CCW = "CCW",
  CW = "CW"
}

export enum Stage {
  Starting = "STARTING",
  Adding = "ADDING",
  Editing = "EDITING",
  Previewing = "PREVIEWING"
}

export type PreviewState = {
  consolidatedSegments: LabyrinthSegment[]
  segmentsToConsolidate: LabyrinthSegment[]
}

export type ZLevel = {
  zIndex: number
  active: boolean
}

export type StoreState = {
  builderStage: Stage
  currentPosition: Position | null
  currentSegment: LabyrinthSegment | null
  currentSegmentIndex: number | null
  error: string | null
  labyrinthPath: string | null
  labyrinthSegments: LabyrinthSegment[]
  segmentsAtSelectedPosition: LabyrinthSegment[]
  success: string | null
  zLevels: ZLevel[]
  TILE_SIZE: number
  WIDTH: number
  HEIGHT: number
}
