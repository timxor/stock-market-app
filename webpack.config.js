/*const path = require('path');

module.exports = {
  // other webpack configurations...
  resolve: {
    fallback: {
      assert: require.resolve("assert/"),
      stream: require.resolve("stream-browserify"),
      util: require.resolve("util/"),
      crypto: require.resolve("crypto-browserify"),
      url: require.resolve("url/"),
      querystring: require.resolve("querystring-es3"),
      querystring: require.resolve("querystring"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      zlib: require.resolve("browserify-zlib"),
      buffer: require.resolve("buffer/")
    },
  },
};*/

const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
	// Other rules...
	plugins: [
		new NodePolyfillPlugin()
	]
};
