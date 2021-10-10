export const config = {
  graphqlAPIUrl: "/api/graphql",
  title: process.env.NEXT_PUBLIC_TITLE || "raidit",
  auth: {
    allowSignupFromDomains: process.env.ALLOWED_SIGNUP_DOMAINS
      ? process.env.ALLOWED_SIGNUP_DOMAINS.split(",").map((s) => s.trim())
      : null,
  },
  categories: ["music", "funny", "videos", "programming", "news", "fashion"],
};
