import React, { useCallback, useState } from "react";
import { OnChange } from "react-final-form-listeners";
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
            e:
              | Partial<
                  Pick<
                    React.SyntheticEvent<Element, Event>,
                    "preventDefault" | "stopPropagation"
                  >
                >
              | undefined
          ) => {
            handleSubmit(e);
            form.reset();
          }}
        >
          <CommentFormTextArea name="content" onSubmit={handleSubmit} />
          <CommentFormSubmitButton loading={loading} />
        </StyledForm>
      )}
    </Form>
  );
};

export default CommentForm;
