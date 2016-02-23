var AppDispatcher = require('../dispatcher/AppDispatcher');
var DetailConstants = require('../constants/detail-constant');

var MangaDetailActions = {

    fetchData: function () {
        AppDispatcher.dispatch({
            actionType: DetailConstants.DATA_GET
        });
    }

};

module.exports = MangaDetailActions;
