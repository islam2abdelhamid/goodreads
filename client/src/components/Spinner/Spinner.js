import React from 'react';
import classes from './Spinner.module.css'

export const Spinner = () => {
  return (
    <div className={classes.lds_ripple}>
      <div></div>
      <div></div>
    </div>
  );
};
