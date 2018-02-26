import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default (props) => (
  <div className="card mb-2">
    <div className="card-body d-flex justify-content-between">
      <div>
        <Link to={props.url} target="_blank"><h5>{props.headline}</h5></Link>
        <p className="card-text"><small className="text-muted">{moment(props.date).format('MMM Do, YYYY')}</small></p>
      </div>
      <button className="btn btn-sm btn-success" disabled={props.saved} onClick={(e) => props.onSave(props.url, props.headline, props.date, e)}>Save</button>
    </div>
  </div>
)