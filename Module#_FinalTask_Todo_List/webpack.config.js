const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = ({ mode = "development" } = {}) => {
  const isProd = mode === "production";

  const getStyleLoaders = () => {
    return [
      isProd ? MiniCssExtractPlugin.loader : "style-loader",
      "css-loader",
    ];
  };

  const getPlagins = () => {
    const plagins = [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
    ];
    if (isProd) {
      plagins.push(
        new MiniCssExtractPlugin({
          filename: "css/styles.css",
        })
      );
    }
    return plagins;
  };

  return {
    target: "web",
    mode: isProd ? "production" : "development",

    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "js/bundle.js",
    },

    devServer: {
      open: true,
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ["babel-loader", "eslint-loader"],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
              },
            },
          ],
          
        },
        {
          test: /\.(css)$/,
          use: getStyleLoaders(),
        },

        {
          test: /\.(s[ca]ss)$/,
          use: [...getStyleLoaders(), "sass-loader"],
        },
      ],
    },

    plugins: getPlagins(),
  };
};