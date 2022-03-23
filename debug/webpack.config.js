/* eslint-disable prettier/prettier */
const path = require("path");

module.exports = {
	devtool: false,
	mode: "development",
	context: path.resolve(__dirname, "."),
	entry: "./src/index.js",
	output: {
		filename: "main.js",
		path: path.resolve("dist")
		// path: path.resolve(__dirname, 'dist')
	},
	module: {
	  rules: [
	    { test: /\.js|ts$/, use: 'babel-loader' ,},
	  ],
	},
};
