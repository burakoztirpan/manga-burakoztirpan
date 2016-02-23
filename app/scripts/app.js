/**
 * Created by burakoztirpan on 21.02.16.
 */
'use strict';

var React = window.React = require('react'),
    ReactDOM = require("react-dom"),
    Timer = require("./ui/Timer"),
    mountNode = document.getElementById("app"),
    mangaListContent = document.getElementById("manga-list-app"),
    MangaList = require("./ui/manga-list"),
    MangaListApp = require("./ui/manga-list-app"),
    MangaListStore = require('./stores/manga-list-store'),
    MangaDetailApp = require('./ui/manga-detail-app');

var App = React.createClass({
    getInitialState: function () {
        return {
            route: window.location.hash.substr(1)
        };
    },

    componentDidMount() {

        var thisState = this;

        function addListenerMulti(el, s, fn) {
            var evts = s.split(' ');
            for (var i=0, iLen=evts.length; i<iLen; i++) {
                el.addEventListener(evts[i], fn, false);
            }
        }

        addListenerMulti(window, 'hashchange load', function(){
            thisState.setState({
                route: window.location.hash.split('/')[0]
            })
        });
    },

    render: function () {
        //route
        var Child;
        switch (this.state.route) {
            case '/':
                Child = MangaListApp;
                break;
            case '#manga-detail':
                Child = MangaDetailApp;
                break;
            default:
                Child = MangaListApp; //404
        }

        return (
            <div className="app-container">
                <Child />
            </div>
        );
    }
});


ReactDOM.render(<App />, mangaListContent);

