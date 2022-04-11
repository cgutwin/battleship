import { BattleshipGame } from "./battleshipGame"

export class BattleshipController {
  games: Record<string, BattleshipGame> = {}

  public createGame() {
    const game = new BattleshipGame()
    this.games[game.id] ||= game
    return game
  }
}
