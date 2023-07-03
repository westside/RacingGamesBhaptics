const SelectedGame = require('./selectedGame');
const PcarsApi = require('./pcars/pcarsApi');
const AccApi = require('./acc/accApi');

class ApiFactory {

    static getApiByGame()
    {
        let api = null;
        switch (SelectedGame.getGameId())
        {
            case 'pc1':
                api = new PcarsApi();
                break;
            case 'pc2':
                api = new PcarsApi();
                break;
            case 'pc3':
                api = new PcarsApi();
                break;
            case 'acc':
                api = new AccApi();
                break;
            default:
                break;
        }

        return api;
    }
  }
  
  module.exports = ApiFactory