/* eslint-disable prettier/prettier */
const webpack = require("../lib/webpack.js");
const config = require("./webpack.config");

const compiler = webpack(config);

compiler.run((err, stats) => {
	console.log(11);
});
