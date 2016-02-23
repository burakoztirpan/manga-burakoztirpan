/**
 * Created by burakoztirpan on 21.02.16.
 */
'use strict';

var React = require('react');

var mangaList = React.createClass({
    render : function() {
        var createItem = function(items, i) {
            var href = '#manga-detail/'+items.i;
            return <a key={i} href={href}><li>{++i}.{items.t} ({items.h} Hits)</li></a>;

        };
        return (
            <ul className="no-padding">{this.props.items.map(createItem)}</ul>
        )
    }
});

module.exports = mangaList;
