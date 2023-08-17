const SelectedGame = require('../selectedGame');
const PcarsApi = require('./pcars/pcarsApi');
const Pcars1Api = require('./pcars1/pcars1Api');
const AccApi = require('./acc/accApi');
const AcApi = require('./ac/acApi');
const Dr2Api = require('./dr2/dr2Api');
const Rf2Api = require('./rf2/rf2Api');
const RrrApi = require('./rrr/rrrApi');

class ApiFactory {

    static getApiByGame()
    {
        let api = null;
        switch (SelectedGame.getGameId())
        {
            case 'pc1':
                api = new Pcars1Api();
                break;
            case 'pc2':
                api = new PcarsApi();
                break;
            case 'pc3':
                api = new PcarsApi();
                break;
            case 'am2':
                api = new PcarsApi();
                break;
            case 'ac':
                api = new AcApi();
                break;
            case 'acc':
                api = new AccApi();
                break;
            case 'dr2':
                api = new Dr2Api();
                break;
            case 'rrr':
                api = new RrrApi();
                break;
            case 'rf2':
                api = new Rf2Api();
                break;
            default:
                break;
        }

        return api;
    }
  }
  
  module.exports = ApiFactory