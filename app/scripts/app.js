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
    MangaListStore = require('./stores/manga-list-store');

var App = React.createClass({
  getInitialState: function() {
    return {items: [], text: ''};
  },
  render: function() {
    return (
      <div className="Test">
        <MangaListApp />
      </div>
    );
  }
});


//ReactDOM.render(<TodoApp />, mountNode);
ReactDOM.render(<App />, mangaListContent);

