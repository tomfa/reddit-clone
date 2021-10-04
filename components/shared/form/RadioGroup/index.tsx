import React from "react";
import styled from "styled-components";
import RadioGroupOption from "./Option";
import {FieldProps} from "react-final-form";

const RadioGroupWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;

  input[type="radio"] {
    display: none;
  }
`;

const renderOptions = (field: FieldProps<HTMLInputElement, any>) => {
  return field.options.map((option: HTMLOptionElement, key: number) => (
    <RadioGroupOption
      {...option}
      active={field.input.value === option.value}
      onClick={(e) => {
        e.preventDefault();
        field.input.onChange(option.value);
      }}
      key={key}
    />
  ));
};

type Props = { field: FieldProps<HTMLInputElement, any> };
const RadioGroup = ({ field }: Props) => (
  <RadioGroupWrapper>{renderOptions(field)}</RadioGroupWrapper>
);

export default RadioGroup;
