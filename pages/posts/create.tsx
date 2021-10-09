import { Field, Form as FinalForm } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import Form from "../../components/shared/form/Form";
import renderField from "../../components/shared/form/renderField";
import SubmitButton from "../../components/shared/form/SubmitButton";
import { config } from "../../lib/config";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  PostsQuery,
  PostType,
  useAddPostMutation,
  usePostsLazyQuery,
} from "../../graphql/generated/types";
import { useCurrentCategory, useUserData } from "../../lib/hooks";
import { ROUTES } from "../../utils/routes.utils";

const postTypes = [
  {
    label: "link",
    value: PostType.Link,
  },
  {
    label: "text",
    value: PostType.Text,
  },
];

export default function CreatePostForm() {
  const category = useCurrentCategory() || config.categories[0];
  const router = useRouter();
  const { user } = useUserData();
  const { isLoggedIn, isLoading } = useUserData();
  const [fetchPosts, { updateQuery: updatePostsQuery }] = usePostsLazyQuery();
  const [postMutation, postResult] = useAddPostMutation();
  const [postType, setPostType] = useState<PostType>(PostType.Text);
  const onSubmit = useCallback(
    async (post: {
      content: string;
      category: string;
      type: PostType;
      title: string;
    }) => {
      if (!user) {
        return;
      }
      const postMutationData = await postMutation({
        variables: { input: { ...post, type: postType } },
      });
      const newPost = postMutationData.data?.addPost;
      if (newPost && updatePostsQuery) {
        updatePostsQuery((query: PostsQuery) => {
          return {
            posts: [newPost].concat(query.posts),
          };
        });
      }
      await router.push(ROUTES.HOME());
    },
    [user, router, updatePostsQuery, postMutation, postType]
  );

  useEffect(() => {
    if (!isLoggedIn && !isLoading) {
      router.push(ROUTES.HOME());
    }
  }, [isLoggedIn, isLoading, router]);

  return (
    <FinalForm
      onSubmit={onSubmit}
      initialValues={{ type: PostType.Text, category }}
      style={{ width: "100%" }}
    >
      {({ handleSubmit }) => (
        <Form
          loading={postResult.loading}
          onSubmit={handleSubmit}
          className={""}
          wide
        >
          <Field
            name="type"
            label="type"
            type="radiogroup"
            component={renderField}
            options={postTypes}
          />
          <OnChange name="type">
            {(value: PostType, previous: PostType) => {
              // TODO: This package is to be replaced...
              setPostType(value);
            }}
          </OnChange>
          <Field
            name="category"
            label="category"
            type="select"
            component={renderField}
          >
            {config.categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </Field>
          <Field
            name="title"
            label="title"
            type="text"
            component={renderField}
          />
          {postType === PostType.Link && (
            <Field
              name="content"
              label="url"
              type="url"
              component={renderField}
            />
          )}
          {postType === PostType.Text && (
            <Field
              name="content"
              label="text"
              type="textarea"
              component={renderField}
            />
          )}
          <SubmitButton type="submit">create post</SubmitButton>
        </Form>
      )}
    </FinalForm>
  );
}
