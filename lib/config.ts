export const config = {
  graphqlAPIUrl: "/api/graphql",
  auth: {
    allowSignupFromDomains: process.env.ALLOWED_SIGNUP_DOMAINS
      ? process.env.ALLOWED_SIGNUP_DOMAINS.split(",").map((s) => s.trim())
      : null,
  },
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey:
      process.env.FIREBASE_PRIVATE_KEY &&
      process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/gm, "\n"),
    databaseUrl: process.env.FIREBASE_DATABASE_URL,
  },
  categories: ["music", "funny", "videos", "programming", "news", "fashion"],
};
