import React from 'react';
import cx from 'classnames';
import styles from './loading.module.scss';

const IconLoading = () => {
  return (
    <div className={cx(styles.lds_ellipsis)}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default IconLoading;
