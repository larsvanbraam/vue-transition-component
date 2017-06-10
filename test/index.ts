// require all test files
const testsContext = (<any> require).context(
	'./',
	true,
	/Spec\.ts/,
);

testsContext.keys().forEach(testsContext);

// require all source files
const sourcesContext = (<any> require).context(
	'../src/',
	true,
	/\.ts$/,
);

sourcesContext.keys().forEach(sourcesContext);
