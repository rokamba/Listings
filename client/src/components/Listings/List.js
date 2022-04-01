import React from 'react';

import ListingItem from './ListingItem';
import './List.css';

const list = props => {
  const events = props.events.map(event => {
    return (
      <ListingItem
        key={event._id}
        eventId={event._id}
        title={event.title}
        price={event.price}
        date={event.date}
        userId={props.authUserId}
        creatorId={event.creator._id}
        onDetail={props.onViewDetail}
      />
    );
  });

  return (<ul className="event__list">{events}</ul>);
};

export default list;