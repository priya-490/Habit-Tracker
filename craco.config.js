module.exports = {
    webpack: {
      configure: {
        resolve: {
          fallback: {
            zlib: require.resolve("browserify-zlib"),
            querystring: require.resolve("querystring-es3"),
            crypto: require.resolve("crypto-browserify"),
            fs: false,
            stream: require.resolve("stream-browserify"),
            path: require.resolve("path-browserify"),
          },
        },
      },
    },
  };
  