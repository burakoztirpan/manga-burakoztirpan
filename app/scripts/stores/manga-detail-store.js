/**
 * Created by burakoztirpan on 23.02.16.
 */
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var DetailConstant = require('../constants/detail-constant');
var assign = require('object-assign');
var CHANGE_EVENT = 'change';

var _data = {};

function fetchData() {

    var id = location.href.split('/')[location.href.split('/').length - 1];

    var mangaListSource = "https://www.mangaeden.com/api/manga/" + id + "";

    $.get(mangaListSource, function (result) {
        return result.manga;
    }).then(function (data) {
        _data = data;
        MangaDetailStore.emitChange();
    });

}

var MangaDetailStore = assign({}, EventEmitter.prototype, {

    getData: function () {
        if (!!_data) {
            return _data;
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

        case DetailConstant.DATA_GET:
            fetchData();
            break;

        default:
    }
});

module.exports = MangaDetailStore;
