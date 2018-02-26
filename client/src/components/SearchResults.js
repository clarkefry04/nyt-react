import React from 'react';
import axios from 'axios';

import SearchResult from './SearchResult';

export default class SearchResults extends React.Component{
  constructor(props){
    super(props);
  }

  onSave = (url, headline, date, e) => {
    console.log(e.detail)
    console.log(e.target);
    console.log(url);
    console.log(headline);
    console.log(date);
    axios.post('/api/articles', {
      url,
      headline,
      date
    })
    .then(resp => {
      console.log(resp);
      this.props.onSave(url);
    })
    .catch(e => {
      console.log(e);
    });
  }

  render(){
    return(
      <div className="card mb-3">
        <h3 className="card-header text-center">Results</h3>
        <div className="card-body">
          {this.props.results.map(result => <SearchResult key={result.url} onSave={this.onSave} {...result} />)}
        </div>
      </div>
    )
  }
}