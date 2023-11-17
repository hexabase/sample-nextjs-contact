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
  minRows?: number;
  maxRows?: number;
  handleSubmit: Function;
  onSendMessage: Function;
}

export const TextArea: React.FC<typeInput> = (props: typeInput) => {
  const { className, field, onBlur, onChange, onSendMessage, ref, minRows, maxRows, handleSubmit, ...rest } = props;

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
    <Input.TextArea
      {...rest}
      {...field}
      ref={ref}
      onBlur={handleBlur}
      onChange={handleOnChange}
      onPressEnter={(e) => {
        e.preventDefault();
        handleSubmit(onSendMessage({ message: (e.target as HTMLTextAreaElement).value.trim() }));
      }}
      style={{ minHeight: 44 }}
      className={classnames(styles.input_component, [className])}
      autoSize={{ minRows: minRows ? minRows : 1, maxRows: maxRows ? maxRows : 5 }}
    />
  );
};
