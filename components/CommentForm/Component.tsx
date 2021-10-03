import React, { useCallback } from "react";
import CommentFormTextArea from "./TextArea";
import CommentFormSubmitButton from "./SubmitButton";
import { StyledForm } from "./StyledForm.styles";
import { Form } from "react-final-form";
import { useAddCommentMutation } from "../../graphql/generated/types";

const CommentForm = ({ slug }: { slug: string }) => {
  const [addComment, { data, loading, error }] = useAddCommentMutation();
  const submitComment = useCallback(
    ({ comment }: { comment: string }) => {
      if (!comment) {
        return;
      }
      addComment({
        variables: { input: { content: comment, postSlug: slug } },
      });
    },
    [addComment, slug]
  );
  if (data) {
    return null;
  }
  return (
    <Form onSubmit={submitComment}>
      {({ handleSubmit }) => (
        <StyledForm onSubmit={handleSubmit}>
          <CommentFormTextArea name="comment" onSubmit={handleSubmit} />
          <CommentFormSubmitButton loading={loading} />
        </StyledForm>
      )}
    </Form>
  );
};

export default CommentForm;
