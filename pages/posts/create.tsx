import { Field, Form as FinalForm } from "react-final-form";
import Form from "../../components/shared/form/Form/index";
import renderField from "../../components/shared/form/renderField";
import SubmitButton from "../../components/shared/form/SubmitButton";
import { config } from "../../lib/config";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import {
  PostType,
  useAddPostMutation,
} from "../../graphql/generated/types";
import { useUserData } from "../../lib/hooks";

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
  const router = useRouter();
  const { isLoggedIn } = useUserData();
  const [postMutation, postResult] = useAddPostMutation();
  const [postType, setPostType] = useState<PostType>(PostType.Text);
  const onSubmit = (post: {
    content: string;
    category: string;
    type: PostType;
    title: string;
  }) => {
    console.log(`Posting`, post);
    postMutation({ variables: { input: { ...post, type: postType } } });
  };
  const post = useMemo(() => postResult.data?.addPost, [postResult]);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    if (post) {
      // router.push(`/a/${post.category}/${post.slug}`);
    }
  }, [post, router]);

  return (
    <FinalForm
      onSubmit={onSubmit}
      initialValues={{ type: PostType.Text, category: config.categories[0] }}
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
