module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.graphql?$/,
      loader: "webpack-graphql-loader",
    });

    return config;
  },
};
