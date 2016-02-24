var AppDispatcher = require('../dispatcher/AppDispatcher');
var DetailConstants = require('../constants/detail-constant');

var MangaDetailActions = {

    fetchData: function () {
        AppDispatcher.dispatch({
            actionType: DetailConstants.DATA_GET
        });
    },

    setFavorite: function (title) {
        AppDispatcher.dispatch({
            actionType: DetailConstants.SET_FAVORITE,
            title: title
        });
    },

    isFavorite: function () {
        AppDispatcher.dispatch({
            actionType: DetailConstants.IS_FAVORITE
        });
    }

};

module.exports = MangaDetailActions;
