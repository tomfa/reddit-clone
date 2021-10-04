import React, { useCallback } from "react";
import styled from "styled-components";
import { Field } from "react-final-form";
import Input from "../shared/form/Input";

const TextArea = styled(Input)`
  margin: 0;
  border: none;
  border-bottom: 1px solid var(--color-border);
  border-radius: 0;
  resize: none;

  :hover,
  :focus {
    border: none;
    border-bottom: 1px solid var(--color-border);
    box-shadow: none;
  }
`;

type Props = { onSubmit: () => void; name: string };
const CommentFormTextArea = (props: Props) => {
  const onKeyDown = useCallback(
    (e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        props.onSubmit();
      }
    },
    [props.onSubmit]
  );

  const renderField = useCallback(
    (field) => (
      <TextArea
        as="textarea"
        {...field.input}
        placeholder="enter your comment"
        rows="2"
        onKeyDown={onKeyDown}
      />
    ),
    [onKeyDown]
  );

  return <Field name={props.name} component={renderField} />;
};

export default CommentFormTextArea;
