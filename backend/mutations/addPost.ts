import { MutationAddPostArgs, Post } from "../../graphql/generated/types";
import { slugify } from "../../utils/string.utils";
import { UserAuth } from "../../request.types";

export const addPost = async (
  { input }: MutationAddPostArgs,
  auth: UserAuth
): Promise<Post> => {
  const slug = slugify(input.title);
  return {
    author: { id: "" },
    category: input.category,
    comments: [],
    content: input.content,
    created: new Date(),
    score: 0,
    slug,
    title: input.title,
    type: input.type,
    views: 0,
    votes: [],
  };
};
