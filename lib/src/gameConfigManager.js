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

    static checkConfigNeeded(id)
    {

    }
}

module.exports = GameConfigManager;