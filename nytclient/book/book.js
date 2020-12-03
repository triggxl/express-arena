import React from 'react';
import './book.css';
import moment from 'moment';

export default function Book(props) {
  return (
    <div className="book">
      <h2>{props.title}</h2>
        <div className="book-author">by {props.author}</div>
        <div className="book-publisher">
          Published By: {props.publisher}
          on {moment(props.published_date).format('DD MMM YYYY')}
        </div>
        <div className="book-description">{props.description}</div>
        <div className="book-details">
          Rank {props.rank} this week
        </div>
     
    </div>
  )
}