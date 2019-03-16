import React, { Component } from 'react';
import SearchResults from './SearchResults';


class SearchCategory extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      searchResults: [],
      category: this.props.category,
      showResults: this.props.showResults
    };
    this.onTextChange = this.onTextChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  onTextChange(event) {
    this.setState({
      searchTerm: event.target.value
    });
  }

  onSearch() {
    const {
      searchTerm,
      searchResults,
      category
    } = this.state;
    console.log("Category:", category);
    console.log("Search Term:", searchTerm);

    fetch('items/search1/' + category + '/' + searchTerm, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => {
        console.log("Search Response:", json);
        if (json.count > 0) {
          this.setState({
            searchResults: json.items,
            showResults: true
          })
        }
      })
  }

  render() {
    const {
      searchTerm,
      searchResults,
      showResults
    } = this.state;
    return (
      <div className="SearchCategory">
        <input type="text" placeholder="Search" value={searchTerm} onChange={this.onTextChange} /><button onClick={this.onSearch}>Search</button>

        {
          searchResults.length > 0 && showResults ? (
            <SearchResults results={searchResults} />
          ) : (null)
        }

      </div>
    );
  }
}

export default SearchCategory;
