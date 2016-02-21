/**
 * Created by burakoztirpan on 21.02.16.
 */
'use strict';

var React = require('react');

var mangaList = React.createClass({
    render : function() {
        var createItem = function(items, i) {
            return <li key={i}>{++i}.{items.a} ({items.h} Hits)</li>;

        };
        return (
            <ul className="no-padding">{this.props.items.map(createItem)}</ul>
        )
    }
});

module.exports = mangaList;
