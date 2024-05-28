import React, { forwardRef } from 'react';
import './Card.css';

const Card = forwardRef((props, ref) => {
  const classes = 'card ' + props.className;

  return (
    <div ref={ref} className={classes}>
      {props.children}
    </div>
  );
});

export default Card;
