var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ListConstant = require('../constants/list-constant');
var assign = require('object-assign');
var CHANGE_EVENT = 'change';

var _list = {};

function fetchList() {
    var mangaListSource = "https://www.mangaeden.com/api/list/0/?p=0";

    $.get(mangaListSource, function (result) {
        return result.manga;
    }).then(function (data) {
        _list = _.orderBy(data.manga, ['h'], ['desc']);
        MangaListStore.emitChange();
    });

}

var MangaListStore = assign({}, EventEmitter.prototype, {

    getAll: function () {
        if (!!_list.length) {
            return _list;
        }
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

});

AppDispatcher.register(function (action) {

    switch (action.actionType) {

        case ListConstant.LIST_GET:

            fetchList();
            break;

        default:
    }
});

module.exports = MangaListStore;
