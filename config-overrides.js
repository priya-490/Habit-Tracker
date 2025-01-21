const webpack = require("webpack");

module.exports = function override(config) {
    config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        zlib: require.resolve("browserify-zlib"),
        path: require.resolve("path-browserify"),
        buffer: require.resolve("buffer"),
        url: require.resolve("url"),
        querystring: require.resolve("querystring-es3"),
    };

    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: "process/browser",
            Buffer: ["buffer", "Buffer"],
        }),
    ]);

    return config;
};
