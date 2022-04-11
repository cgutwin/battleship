import { ShipPositionInfo, ShipType } from "./ship"

export interface PlayingBoardOptions {
  size?: number
  maxShips?: number
}

export class PlayingBoard {
  readonly size: number = 12
  readonly maxShips: number = 5
  layout: BoardLayoutType

  constructor(options: PlayingBoardOptions, layout: BoardLayoutType) {
    if (options.size) this.size = options.size
    if (options.maxShips) this.maxShips = options.maxShips

    this.layout = layout
  }

  static validate(layout: BoardLayoutType) {
    // TODO: Implement validator function to ensure no overlapping ships.
  }
}

export type BoardLayoutType = Record<ShipType, ShipPositionInfo>
