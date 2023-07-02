class SelectedGame {
  static gameId = '';
  static setGameID(id)
  {
    this.gameId = id;
  }

  static getGameId() {
    return this.gameId;
  }
}

module.exports = SelectedGame