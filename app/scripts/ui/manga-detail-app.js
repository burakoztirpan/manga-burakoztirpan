var React = require('react'),
    DetailActions = require('../actions/manga-detail-actions'),
    MangaDetailStore = require('../stores/manga-detail-store');

var mangaDetailApp = React.createClass({

    getInitialState: function () {
        DetailActions.fetchData();
        DetailActions.isFavorite();

        return {data: [], isFavorite: false, favoriteTitle: 'Add Favorite'};
    },

    componentDidMount: function () {
        MangaDetailStore.addChangeListener(this._onChangeData);
    },

    _onChangeData: function () {
        this.setState(setData());
    },

    componentWillUnmount: function () {
        MangaDetailStore.removeChangeListener(this._onChangeData);
    },

    addFavorite: function() {
        DetailActions.setFavorite(this.state.data.title);
    },

    render: function () {

        return (
            <div className="content">
                <div className="col-xs-12 manga-detail no-padding"
                     id="manga-detail">

                    <div className="row-fluid">
                        <div className="manga-name col-xs-12">
                            {this.state.data.title}
                        </div>
                        <div className="manga-image col-xs-12">
                            <img src={this.state.data.imageURL} />
                        </div>
                        <div className="manga-desc col-xs-12">
                            {this.state.data.description}
                        </div>

                        <div className="manga-hits col-xs-4">Hits: {this.state.data.hits}</div>
                        <div className="manga-author col-xs-8">Author: {this.state.data.author}</div>

                        <div className="col-xs-12">
                            <a href="#">
                                <button className="btn btn-primary btn-block">Back</button>
                            </a>
                        </div>
                        <div className="col-xs-12">
                            <button onClick={this.addFavorite} className="btn btn-success btn-block">{this.state.favoriteTitle}</button>
                        </div>
                    </div>


                </div>
            </div>
        )
    }
});

function setData() {
    return {
        data: MangaDetailStore.getData(),
        isFavorite: MangaDetailStore.isFavorite(),
        favoriteTitle: MangaDetailStore.isFavorite() ? 'Remove Favorite' : 'Add Favorite'
    };
}

module.exports = mangaDetailApp;
