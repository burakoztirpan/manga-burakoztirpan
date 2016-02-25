/**
 * Created by burakoztirpan on 23.02.16.
 */
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var DetailConstant = require('../constants/detail-constant');
var assign = require('object-assign');
var CHANGE_EVENT = 'change';

var _data = {};
var _isFavorite = false;

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

function isAvailbe() {
    var favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    var itemId = location.hash.split('/')[1];
    var itemLength = _.filter(favorites, ['i', itemId]).length;
    return itemLength > 0;
}


function isFavorite() {
    _isFavorite = isAvailbe();
    MangaDetailStore.emitChange();

}

function setFavorite(title) {
    var favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    var item = {
        t: title,
        i: location.hash.split('/')[1]
    };

    if (isAvailbe()) {
        _.remove(favorites, function (n) {
            return n.i === item.i;
        });
    } else {
        favorites.push(item);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    isFavorite();
}

var MangaDetailStore = assign({}, EventEmitter.prototype, {

    getData: function () {
        if (!!_data) {
            return _data;
        }
    },

    isFavorite: function () {
        return _isFavorite;
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
        case DetailConstant.SET_FAVORITE:
            setFavorite(action.title);
            break;
        case DetailConstant.IS_FAVORITE:
            isFavorite();
            break;

        default:
    }
});

module.exports = MangaDetailStore;
