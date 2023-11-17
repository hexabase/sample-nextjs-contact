import React from "react";
import classnames from "classnames";
import { Input, InputProps } from "antd";
import styles from "./styles.module.scss";

export interface typeInput extends InputProps {
  ref?: any;
  field?: any;
  onBlur?: any;
  onChange?: any;
  className?: string;
}

export const TextInput: React.FC<typeInput> = (props: typeInput) => {
  const { className, field, onBlur, onChange, ref, ...rest } = props;

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value.trim() !== field?.value) field?.onChange(e.target.value.trim());
    field?.onBlur();
    if (onBlur) onBlur();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    field && field?.onChange(e);
    onChange && onChange(e);
  };

  return (
    <Input
      {...rest}
      {...field}
      ref={ref}
      onBlur={handleBlur}
      onChange={handleOnChange}
      className={classnames(styles.input_component, [className])}
    />
  );
};
