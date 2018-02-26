import React from 'react';
import axios from 'axios';

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topic: '',
      startYear: '',
      endYear: '',
      errorState: false,
      errorMessage: ''
    }
  }

  onTopicChange = (e) => {
    const topic = e.target.value;
    this.setState(() => ({ topic }));
  };

  onStartYearChange = (e) => {
    const startYear = e.target.value;
    if (startYear.match(/^\d{0,4}$/)){
      this.setState(() => ({ startYear }));
    }
  };

  onEndYearChange = (e) => {
    const endYear = e.target.value;
    if (endYear.match(/^\d{0,4}$/)){
      this.setState(() => ({ endYear }));
    }
  };

  validateSearchData = () => {
    let resp = {
      valid: false,
      reason: ''
    }
    
    if (!this.state.topic) {
      resp.reason = 'Please enter a search term';
      return resp;
    }

    if (!!this.state.startYear && !this.state.startYear.match(/^\d{4}$/)){
      resp.reason = 'Please enter a valid starting year';
      return resp;
    }

    if (!!this.state.endYear && !this.state.endYear.match(/^\d{4}$/)){
      resp.reason = 'Please enter a valid ending year';
      return resp;
    }

    if (!!this.state.startYear && !!this.state.endYear){
      if (parseInt(this.state.startYear, 10) > parseInt(this.state.endYear, 10)){
        resp.reason = 'Starting year must be earlier than, or equal to, ending year';
        return resp;
      }
    }

    resp.valid = true;
    return resp;
  }

  submitSearch = () => {
    this.props.startLoading();

    const params = {
      'api-key': '6210d32b86a44b439f84ae9be6fc555c',
      'q': encodeURIComponent(this.state.topic),
      'fl': 'web_url,pub_date,headline',
      'page': 0
    }
    
    if (!!this.state.startYear){
      const begin_date = this.state.startYear + '0101';
      params.begin_date = begin_date;
    }

    if (!!this.state.endYear){
      const end_date = this.state.endYear + '1231';
      params.end_date = end_date;
    }

    console.log(params);

    axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json", { params })
    .then(resp => {
      console.log(resp.data.response.docs);
      const results = resp.data.response.docs.map(result => {
        return {
          url: result.web_url,
          headline: result.headline.main,
          date: result.pub_date
        }
      })
      console.log(results);
      this.props.onSubmit(results);
    })
    .catch(err => {
      console.log(err);
    });    
  }
  
  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);

    const validData = this.validateSearchData();
    console.log(validData);

    if (validData.valid){
      this.setState({
        errorState: false,
        errorMessage: ''
      });
      this.submitSearch();
    } else {
      this.setState({
        errorState: true,
        errorMessage: validData.reason
      });
    }
  }

  render() {
    return (
      <div className="card text-center mb-3">
        <h3 className="card-header">Search</h3>
        <div className="card-body">
          {this.state.errorState && 
            <div className="alert alert-danger" role="alert">{this.state.errorMessage}</div>
          }
          <form 
            onSubmit={this.onSubmit}
            className="form"
            >
            <div className="form-group">
              <label htmlFor="topic">Topic</label>
              <input
                type="text"
                className="form-control"
                autoFocus
                value={this.state.topic}
                onChange={this.onTopicChange}
                id="topic"
                placeholder="Required"
              />
            </div>
            <div className="form-group">
              <label htmlFor="startYear">Start Year</label>
              <input
                type="text"
                className="form-control"
                id="startYear"
                value={this.state.startYear}
                onChange={this.onStartYearChange}
                placeholder="Optional"
              />
            </div>
            <div className="form-group">
              <label htmlFor="endYear">End Year</label>
              <input
                type="text"
                className="form-control"
                id="endYear"
                value={this.state.endYear}
                onChange={this.onEndYearChange}
                placeholder="Optional"
              />
            </div>
            <button className="btn-primary btn">Search</button>
          </form>
        </div>
      </div>
    )
  }
}