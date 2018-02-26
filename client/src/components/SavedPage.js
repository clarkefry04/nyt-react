import React from 'react';
import axios from 'axios';

import SavedArticle from './SavedArticle';

export default class SavedPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      articles: [],
      noSavedArticles: false,
      loading: true
    }

    this.onDeleteArticle = this.onDeleteArticle.bind(this);
  }

  componentDidMount() {
    axios.get('/api/articles')
      .then(resp => {
        const articles = resp.data.articles;
        const noSavedArticles = articles.length === 0 ? true : false;
        this.setState({ articles, noSavedArticles, loading: false });
      })
      .catch(e => {
        console.log(e);
      });
  }

  onDeleteArticle(id, e) {
    console.log(id);
    axios.delete('/api/articles', {
      data: { id }
    })
      .then((doc) => {
        const articles = this.state.articles.filter(article => article._id !== id);
        const noSavedArticles = articles.length === 0 ? true : false;
        this.setState({ articles, noSavedArticles });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render(){
    if (this.state.loading) {
      return (
        <h1 className="text-center">Loading...</h1>
      )
    } else {
      if (!this.state.noSavedArticles) {
        return(
          <div className="card">
            <h3 className="card-header text-center">Saved Articles</h3>
            <div className="card-body">
              {this.state.articles.map(article => <SavedArticle onDeleteArticle={this.onDeleteArticle} key={article._id} {...article} />)}
            </div>
          </div>
        )
      } else {
        return (
          <div className="alert alert-primary" role="alert">
            You have no saved articles.
          </div>
        )
      }
    }
  }
}