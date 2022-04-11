import { Player } from "./player"
import { randomUUID } from "crypto"
import { EventEmitter } from "events"
import { BoardLayoutType, PlayingBoard, PlayingBoardOptions } from "./playingBoard"

enum GameState {
  WAITING,
  READY,
  STARTED
}

const eventEmitter = new EventEmitter()

export class BattleshipGame {
  id: string
  players: Array<Player>
  state: GameState = GameState.WAITING
  boards: Record<string, PlayingBoard> = {}
  readonly options: {
    boardOptions?: PlayingBoardOptions
  }

  constructor() {
    this.id = randomUUID()
    this.players = []

    eventEmitter.addListener("onGameReady", () => {
      for (const player of this.players) {
        player.socket.send("ready.")
      }
    })
  }

  public generateBoard(board: BoardLayoutType, playerId: typeof Player.prototype.id) {
    if (this.state !== GameState.READY) throw new Error("Game not ready.")
    if (this.boards[playerId]) throw new Error("Board already created.")
    const valid = PlayingBoard.validate(board)

    if (valid) {
      this.boards[playerId] = new PlayingBoard({}, board)
      this.findPlayerById(playerId)
          .socket
          .send("valid board submitted.")
    } else {
      this.findPlayerById(playerId)
          .socket
          .send("invalid board submitted.")
    }

    console.log(this)
  }

  public addPlayerToGame(player: Player) {
    if (this.players.length === 2) throw new RangeError("Game already has 2 players.")

    this.players.push(player)

    if (this.players.length === 2) {
      this.state = GameState.READY
      eventEmitter.emit("onGameReady")
    }
  }

  public getPlayersInGame() {
    const players: string[] = []

    for (const player of this.players) players.push(player.name)

    return players
  }

  private findPlayerById(playerId: string) {
    return this.players.filter((player) => player.id === playerId)[0]
  }
}
