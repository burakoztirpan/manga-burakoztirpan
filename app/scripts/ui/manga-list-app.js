var React = require('react'),
    MangaList = require("./manga-list"),
    ListActions = require('../actions/manga-list-actions'),
    MangaListStore = require('../stores/manga-list-store');

var mangaListApp = React.createClass({

    getInitialState: function () {

        //Flex Dispatch without..
        var items = [
            {
                h: "0",
                a: "Loading.."
            }
        ];

        //For Flex architecture
        return {searchKey: "Aramacı", items: items, filteredItems: items};
    },

    componentDidMount: function () {

        MangaListStore.addChangeListener(this._onChangeList);
    },

    _onChangeList: function () {
        this.setState(setListItems());
    },

    componentWillUnmount: function () {
        MangaListStore.removeChangeListener(this._onChangeList);
    },

    onSearch: function (e) {

        this.setState({searchKey: e.target.value});
        var state = this;
        var value = e.target.value;

        var searchResult = state.state.items.filter(function (item) {
            return -1 !== item.t.indexOf(value);
        });

        this.setState({filteredItems: searchResult});

    },

    OnClick: function (e) {
        value = e.target.value;
        location.href = location.href = "detail/:{value}"
    },

    render: function () {

        return (
            <div className="content">

                { !!this.state.filteredItems.length &&
                <div>
                    <div className="col-xs-12 filter-input no-padding">
                        <input type="text"
                               className="form-control"
                               placeholder="Search.."
                               aria-describedby="basic-addon1"
                               onChange={this.onSearch}/>
                    </div>
                    <div className="col-xs-12 manga-list no-padding"
                         id="manga-list">
                        <span><MangaList items={this.state.filteredItems} value={this.state.searchKey}/></span>
                    </div>
                </div>
                }
                { !this.state.filteredItems.length &&
                    <div className="no-data">You do not have any favorite yet :(</div>

                }
            </div>
        )
    }
});

function setListItems() {
    return {
        items: MangaListStore.getAll(),
        filteredItems: MangaListStore.getAll() || []
    };
}

module.exports = mangaListApp;
