var AppDispatcher = require('../dispatcher/AppDispatcher');
var ListConstants = require('../constants/list-constant');

var MangaListActions = {

    fetchList: function () {
        AppDispatcher.dispatch({
            actionType: ListConstants.LIST_GET
        });
    }

};

module.exports = MangaListActions;
