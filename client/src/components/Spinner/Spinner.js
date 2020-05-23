import React from 'react';
import classes from './Spinner.module.css';

export default () => {
  return (
    <div className={classes.lds_ripple}>
      <div></div>
      <div></div>
    </div>
  );
};
