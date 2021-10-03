import React from "react";
import CommentFormTextArea from "./TextArea";
import CommentFormSubmitButton from "./SubmitButton";
import { StyledForm } from "./StyledForm.styles";
import { Form } from "react-final-form";
import { AddCommentInput, PostType } from "../../graphql/generated/types";

type Props = {
  onAddComment: (input: Pick<AddCommentInput, "content">) => void;
  loading: boolean;
};
const CommentForm = ({ onAddComment, loading }: Props) => {
  // TODO: Replace this form library
  return (
    <Form onSubmit={onAddComment}>
      {({ handleSubmit, form }) => (
        <StyledForm
          onSubmit={(
            e: React.SyntheticEvent
          ) => {
            handleSubmit(e);
            form.reset();
          }}
        >
          <CommentFormTextArea name="content" onSubmit={(
            e: React.SyntheticEvent
          ) => {
            handleSubmit(e);
            form.reset();
          }} />
          <CommentFormSubmitButton loading={loading} />
        </StyledForm>
      )}
    </Form>
  );
};

export default CommentForm;
