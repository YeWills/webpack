module.exports = {
	printWidth: 80,
	useTabs: true,
	tabWidth: 2,
	trailingComma: "none",
	endOfLine: "auto",
	arrowParens: "avoid",
	overrides: [
		{
			files: "*.json",
			options: {
				useTabs: false
			}
		}
	]
};
