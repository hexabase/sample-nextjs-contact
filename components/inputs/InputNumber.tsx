import React from 'react';
import { Input } from 'antd';
import cx from 'classnames';
import styles from './styles.module.scss';

export const formatNumber = (value: number | string, numberDigitsAfter?: number) => {
  const splitNumber = String(value).split('.');
  const integerPart = splitNumber[0];
  const decimalPart = splitNumber[1];
  const _decimalPart = numberDigitsAfter && decimalPart ? decimalPart?.substring(0, numberDigitsAfter) : decimalPart;
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  if (splitNumber.length === 2) {
    return formattedInteger + '.' + _decimalPart;
  }
  return formattedInteger;
};

const InputNumber: React.FC<{
  placeholder?: string;
  value?: string;
  handleChangeValue: any;
  numberDigitsBefore?: number;
  numberDigitsAfter?: number;
  autoComplete?: string;
  maxLength?: number;
  max?: number | string;
  className?: string;
  prefix?: any;
  suffix?: any;
  field?: any;
}> = ({
  placeholder,
  value,
  handleChangeValue,
  numberDigitsBefore = 12,
  numberDigitsAfter = 3,
  autoComplete = 'off',
  maxLength = 256,
  max,
  className,
  prefix,
  suffix,
  field,
  ...props
}) => {
  const listNumberKey = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const extensionKey = ['ArrowLeft', 'ArrowRight'];
  const backspace = 'Backspace';
  const dot = '.';

  const handleChange = (e: any) => {
    try {
      const value: string = e.target.value.replaceAll(',', '');
      const splitValue = value?.split(dot);
      const dotPosition = value?.indexOf(dot);
      if (value?.indexOf(dot) === 0) {
        const _value = '0'.concat('.').concat(splitValue[1].substring(0, numberDigitsAfter));
        field && field?.onChange(_value);
        return handleChangeValue(value);
      }
      if (value?.startsWith('0') && !value?.startsWith('0.')) {
        const _value = String(Number(value));
        field && field?.onChange(_value);
        return handleChangeValue(_value);
      }
      if (splitValue?.length === 1) {
        const _value = formatNumber(value.substring(0, numberDigitsBefore));
        field && field?.onChange(_value);
        return handleChangeValue(_value);
      } else {
        const position = dotPosition < numberDigitsBefore ? dotPosition : numberDigitsBefore;
        const beforeValue = splitValue[0].substring(0, position);
        const afterValue = splitValue[1].substring(0, numberDigitsAfter);
        const _value = beforeValue.concat('.').concat(afterValue);
        field && field?.onChange(_value);
        return handleChangeValue(formatNumber(_value));
      }
    } catch (error) {
      // console.error(error);
    }
  };

  const handleKeyDown = (e: any) => {
    try {
      const value = e.target.value;
      if (!listNumberKey.includes(e.key) && !extensionKey.includes(e.key) && e.key !== backspace && e.key !== dot) {
        e.preventDefault();
      }
      if (e.key === dot) {
        if (value?.indexOf(dot) > -1 || numberDigitsAfter === 0) {
          e.preventDefault();
        }
      }
    } catch (error) {
      // console.error(e);
    }
  };

  const handleBlur = (e: any) => {
    e.preventDefault();
  };

  return (
    <Input
      type="text"
      prefix={prefix}
      suffix={suffix}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      autoComplete={autoComplete}
      maxLength={maxLength}
      placeholder={placeholder}
      className={cx(styles.input_component, [className])}
      {...props}
    />
  );
};

export default InputNumber;
