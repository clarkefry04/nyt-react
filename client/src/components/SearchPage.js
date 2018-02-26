import React from 'react';
import axios from 'axios';

import SearchForm from '../components/SearchForm';
import SearchResults from '../components/SearchResults';

export default class SearchPage extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      results: [],
      loading: false
    }
  }

  onSubmit = (results) => {
    console.log("submitted");

    const urls = results.map(result => result.url);
    console.log(urls);

    axios.post('/api/articles/saved', { urls })
      .then((docs) => {
        console.log(docs.data);
        const savedUrls = docs.data;
        results = results.map(result => {
          if (savedUrls.includes(result.url)) {
            result.saved = true;
          } else {
            result.save = false;
          }
          return result;
        })
        this.setState({ results, loading: false })
      })
      .catch((e) => {
        console.log(e);
      });
  }

  onSave = (url) => {
    const results = this.state.results.map(result => {
      if (result.url === url){
        result.saved = true;
      }
      return result;
    });

    this.setState({ results });
  }

  startLoading = () => {
    this.setState({ loading: true });
  }

  render() {   
    
    return (
      <div>
        <SearchForm onSubmit={this.onSubmit} startLoading={this.startLoading} />
        {this.state.loading && <h1 className="text-center">Loading...</h1>}
        {this.state.results.length > 0 && !this.state.loading && <SearchResults onSave={this.onSave} results={this.state.results} />}
      </div>
    )
  }
}