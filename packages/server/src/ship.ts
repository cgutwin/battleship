export enum ShipDirectionType {
  HORIZONTAL,
  VERTICAL
}

class Ship {
  readonly size: number
  readonly type: ShipType
  readonly sunk: boolean
  position: [ number, number ]
  direction: ShipDirectionType

  public placeShip(x: number, y: number, direction: ShipDirectionType) {
    this.position = [ x, y ]
    this.direction = direction
  }
}

// TODO: Tie ship type to ship size.
export type ShipType = "Destroyer" | "Submarine" | "Cruiser" | "Battleship" | "Carrier"
export type ShipPositionInfo = [ number, number, ShipDirectionType ]

