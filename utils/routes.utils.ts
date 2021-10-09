import { Post, User } from "../graphql/generated/types";

export const ROUTES = {
  HOME: () => "/",
  POST: (post: Post) => `/a/${post.category}/${post.id}/${post.slug}`,
  CATEGORY: (category: string) => (category === "all" ? "/" : `/a/${category}`),
  USER: (user: Pick<User, "username">) => `/u/${user.username}`,
  USER_COMMENTS: (user: Pick<User, "username">) =>
    `/u/${user.username}/comments`,
  LOGIN: () => `/login`,
  LOGOUT: () => `/logout`,
  ADD_POST: (category?: string) =>
    category ? `/posts/create?category=${category}` : "/posts/create",
};
