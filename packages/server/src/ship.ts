export enum ShipDirectionType {
  "HORIZONTAL",
  "VERTICAL"
}

interface ShipOptions {
  type: ShipType
  position: [ x: number, y: number ]
  direction: ShipDirectionType
}

export class Ship {
  size: number
  readonly type: ShipType
  readonly sunk: boolean
  readonly position: [ number, number ]
  readonly direction: ShipDirectionType

  constructor(options: ShipOptions) {
    this.type = options.type
    this.position = options.position
    this.direction = options.direction

    this.setSize()
  }

  // Return an array of spaces the ship is placed on the board.
  public getOccupyingSpaces() {
    const spaces: Array<[ x: number, y: number ]> = []

    for (let i = 0; i < this.size; i++) {
      const directionString = this.direction.toString()
      if (directionString == "HORIZONTAL") {
        spaces.push([ this.position[0] + i, this.position[1] ])
      } else if (directionString == "VERTICAL") {
        spaces.push([ this.position[0], this.position[1] + i ])
      }
    }

    return spaces
  }

  private setSize() {
    switch (this.type) {
      case "Carrier":
        this.size = 5
        break
      case "Battleship":
        this.size = 4
        break
      case "Destroyer":
        this.size = 2
        break
      default:
        this.size = 3
        break
    }
  }
}

// TODO: Tie ship type to ship size.
export type ShipType = "Destroyer" | "Submarine" | "Cruiser" | "Battleship" | "Carrier"
export type ShipPositionInfo = [ number, number, ShipDirectionType ]

