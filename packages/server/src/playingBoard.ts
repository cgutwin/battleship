import { Ship, ShipPositionInfo, ShipType } from "./ship"

export interface PlayingBoardOptions {
  size?: number
  maxShips?: number
}

export class PlayingBoard {
  readonly size: number = 10
  readonly maxShips: number = 5
  layout: BoardLayoutType

  constructor(options: PlayingBoardOptions, layout: BoardLayoutType) {
    if (options.size) this.size = options.size
    if (options.maxShips) this.maxShips = options.maxShips

    this.layout = layout
  }

  static validate(layout: BoardLayoutType): boolean {
    let board: Array<Ship> = []

    for (const [ key, value ] of Object.entries(layout)) {
      const ship = new Ship({
        // @ts-ignore
        type: key,
        position: [ value[0], value[1] ],
        direction: value[2]
      })

      board.push(ship)
    }

    for (const ship of board) {
      for (const ship2 of board) {
        // Don't compare if the ships are the same.
        if (ship.type === ship2.type) continue
        const shipPositions = ship.getOccupyingSpaces()
        const toComparePositions = ship2.getOccupyingSpaces()

        for (const position of shipPositions) {
          for (const comparedPosition of toComparePositions) {
            // converting to strings for comparison is okay, as both arrays will be in the same order.
            if (position.toString() === comparedPosition.toString()) return false
          }
        }
      }
    }

    return true
  }
}

export type BoardLayoutType = Record<ShipType, ShipPositionInfo>
