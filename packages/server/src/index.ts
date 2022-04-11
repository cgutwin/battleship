import { WebSocketServer } from "ws"
import EventRouter from "./EventRouter"
import { BattleshipController } from "./battleshipController"
import { Player } from "./player"
import { BoardLayoutType } from "./playingBoard"

const battleship = new BattleshipController()
const ws = new WebSocketServer({
  port: 9000
})

ws.on("listening", () => {
  console.log(ws.address())
})

ws.on("connection", (socket) => {
  const router = new EventRouter(socket)

  router.bind("new_game", () => {
    const game = battleship.createGame()
    socket.send(game.id)
  })

  router.bind("join_game", (data: {
    id: string,
    player: Player
  }) => {
    const player = new Player({
      name: data.player.name,
      socket
    })
    player.socket.send(JSON.stringify({
      id: player.id,
      name: player.name
    }))

    try {
      battleship.games[data.id].addPlayerToGame(player)

      battleship.games[data.id].players.forEach(player => {
        player.socket.send(`Players in room: ${battleship.games[data.id].getPlayersInGame()}`)
      })
    } catch (error) {
      console.error(error.message)
    }

    console.log(battleship.games[data.id])
  })

  router.bind("submit_board", (data: {
    id: string,
    playerId: string,
    board: BoardLayoutType
  }) => {
    const { id, playerId, board } = data
    battleship.games[id].generateBoard(board, playerId)
  })
})










