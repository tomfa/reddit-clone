import React, { useCallback } from "react";
import CommentFormSubmitButton from "./SubmitButton";
import { StyledForm } from "./StyledForm.styles";
import { AddCommentInput } from "../../graphql/generated/types";
import { useForm } from "react-hook-form";
import TextArea from "./TextArea";

type Props = {
  onAddComment: (input: Pick<AddCommentInput, "content">) => void;
  loading: boolean;
};
const CommentForm = ({ onAddComment, loading }: Props) => {
  const { register, handleSubmit, setValue } = useForm<Omit<AddCommentInput, "postId">>();

  const onSubmit = useCallback(
    (input: Omit<AddCommentInput, "postId">) => {
      onAddComment(input);
      setValue("content", "");
    },
    [onAddComment]
  );

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <TextArea
        placeholder="enter your comment"
        rows={2}
        {...register("content")}
      />
      <CommentFormSubmitButton loading={loading} />
    </StyledForm>
  );
};

export default CommentForm;
