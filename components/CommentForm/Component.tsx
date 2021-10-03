import React from "react";
import CommentFormTextArea from "./TextArea";
import CommentFormSubmitButton from "./SubmitButton";
import { StyledForm } from "./StyledForm.styles";
import { Form } from "react-final-form";

const CommentForm = ({ slug }: {slug: string} ) => {
  const submitComment = () => {
    console.log('Implement adding comments')}
  return (
    <Form onSubmit={submitComment}>
      {({ handleSubmit }) => (
        <StyledForm onSubmit={handleSubmit}>
          <CommentFormTextArea name="comment" onSubmit={handleSubmit} />
          <CommentFormSubmitButton />
        </StyledForm>
      )}
    </Form>
  );
}

export default CommentForm;
