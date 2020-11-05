
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  plugins: [
      require('tailwindcss'),
      require('autoprefixer'),
  ],
  rules: [
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],
      }),
    },
  ],
}