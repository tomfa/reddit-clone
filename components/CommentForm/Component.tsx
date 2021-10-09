import React, { useCallback } from "react";
import CommentFormSubmitButton from "./SubmitButton";
import { StyledForm } from "./StyledForm.styles";
import {
  AddCommentInput,
  Post,
  useAddCommentMutation,
} from "../../graphql/generated/types";
import { useForm } from "react-hook-form";
import TextArea from "./TextArea";
import style from "./Component.module.css";
import { useUserData } from "../../lib/hooks";

const CommentForm = ({ post }: { post: Post }) => {
  const { user } = useUserData();
  const [addComment, { loading }] = useAddCommentMutation();
  const { register, handleSubmit, setValue } =
    useForm<Omit<AddCommentInput, "postId">>();

  const onSubmit = useCallback(
    async (args: Omit<AddCommentInput, "postId">) => {
      if (!post || !user) {
        return;
      }
      const input: AddCommentInput = { ...args, postId: post.id };
      await addComment({ variables: { input } });
      setValue("content", "");
    },
    [post, user, setValue]
  );

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)} className={style.wrapper}>
      <TextArea
        placeholder="enter your comment"
        rows={2}
        {...register("content", { required: true })}
      />
      <CommentFormSubmitButton loading={loading} />
    </StyledForm>
  );
};

export default CommentForm;
