const { dialog } = require('electron');
const nativeImage = require('electron').nativeImage
const SelectedGame = require('./selectedGame');
const path = require('path');
const fs = require('fs').promises;

class GameConfigManager {
    
    async readFile(filePath) {
        try {
          return data = await fs.readFile(filePath);
        } catch (error) {
          console.error(`Got an error trying to read the file: ${error.message}`);
        }
    }

    async writeFile(txt, path) {
        try {
          await fs.writeFile(path, txt);
        } catch (error) {
          console.error(`Got an error trying to write to a file: ${error.message}`);
        }
    }

    static checkConfigNeeded()
    {
      if(SelectedGame.getGameId() == '')
      {
        const image = nativeImage.createFromPath(__dirname+'\\..\\..\\img\\icon.png');
        dialog.showMessageBoxSync({ 
          message: 'Please select a game', 
          type: 'info',
          icon: image
        });
        return true;
      }
      return false;
    }
}

module.exports = GameConfigManager;