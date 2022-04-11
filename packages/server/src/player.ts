import { WebSocket } from "ws"
import { randomUUID } from "crypto"

interface PlayerOptions {
  name: string
  socket: WebSocket
}

export class Player {
  readonly id: string
  readonly name: string
  readonly socket: WebSocket

  constructor(options: PlayerOptions) {
    this.id = randomUUID()
    this.name = options.name
    this.socket = options.socket
  }
}
