class SelectedGame {
    constructor() {
      if (SelectedGame._instance) {
        return SelectedGame._instance
      }
      SelectedGame._instance = this;
  
      // ... Your rest of the constructor code goes after this
    }
}

module.exports = SelectedGame