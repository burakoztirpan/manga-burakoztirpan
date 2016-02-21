var React = require('react'),
    MangaList = require("./manga-list");

var mangaListApp = React.createClass({
    getInitialState: function () {

        var items = [
            {
                h: "",
                a: "Loading.."
            }
        ];

        return {searchKey: "Aramacı", items: items, filteredItems: items};
    },


    componentDidMount: function () {

        var mangaListSource = "https://www.mangaeden.com/api/list/0/?p=0";

        this.serverRequest = $.get(mangaListSource, function (result) {
            var sortedHit = _.orderBy(result.manga, ['h'], ['desc']);

            this.setState({
                items: sortedHit,
                filteredItems: sortedHit
            });
        }.bind(this));
    },

    componentWillUnmount: function () {
        this.serverRequest.abort();
    },

    onChange: function (e) {

        this.setState({searchKey: e.target.value});
        var state = this;
        var value = e.target.value;

        var searchResult = _.filter(state.state.items, function (item) {
                return _.startsWith(item.a, value);
        });

        this.setState({filteredItems : searchResult});


    },

    render: function () {
        return (
            <div className="content">

                <div className="col-xs-12 filter-input no-padding">
                    <input type="text"
                           className="form-control"
                           placeholder="Search.."
                           aria-describedby="basic-addon1"
                           onChange={this.onChange}/>
                </div>

                <div className="col-xs-12 manga-list no-padding"
                     id="manga-list">
                    <span><MangaList items={this.state.filteredItems} value={this.state.searchKey}/></span>
                </div>
            </div>
        )
    }
});

module.exports = mangaListApp;
