import React from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';

declare const ButtonVariants: ['default', 'primary', 'secondary', 'out-line', 'warning-out-line'];
declare type ButtonVariant = (typeof ButtonVariants)[number];

type props = {
  text?: any;
  type?: any;
  variant?: ButtonVariant | undefined;
  prefixIcon?: any;
  afterIcon?: any;
  customClassName?: string;
  textClassName?: string;
  loading?: boolean;
  disabled?: any;
  onClick?: any;
};

const ButtonComponent: React.FC<props> = ({
  text,
  variant = 'default',
  type = 'submit',
  prefixIcon,
  afterIcon,
  customClassName,
  textClassName,
  loading,
  disabled,
  ...props
}) => {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled}
      className={cx(styles.button, styles[`button--${variant}`], [customClassName])}
    >
      {prefixIcon}
      <span className={cx([textClassName])}>{text}</span>
      {afterIcon}
    </button>
  );
};

export default ButtonComponent;
