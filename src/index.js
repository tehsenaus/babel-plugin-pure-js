const SRC_FILE_PATT = /\.pure\.jsx?|unknown$/;

const visitor = {
	Program(path, state) {
		const fileName = state.file.opts.sourceFileName;
		if ( !SRC_FILE_PATT.test(fileName) ) {
			path.stop();
		}
	},

	Identifier(path) {
		if (path.node.name === 'foo') {
			path.node.name = 'bar';
		}
	},

	VariableDeclaration(path) {
		if (path.node.kind === 'var' || path.node.kind === 'let') {
			throw path.buildCodeFrameError(path.node.kind + ' is forbidden in pure JS - use const');
		}
	},

	AssignmentExpression(path) {
		throw path.buildCodeFrameError('Assignment is forbidden in pure JS');
	},

	UpdateExpression(path) {
		throw path.buildCodeFrameError('Variable updates are forbidden in pure JS');
	},

	ThisExpression(path) {
		throw path.buildCodeFrameError('this keyword is forbidden in pure JS');
	}
};

module.exports = function pureJsPlugin(babel) {
	return {
		visitor: {
			Program(path, state) {
				const fileName = state.file.opts.sourceFileName;
				if ( SRC_FILE_PATT.test(fileName) ) {
					// We need the plugin to run before other babel plugins, which may generate 'impure' code
					// https://jamie.build/babel-plugin-ordering.html
					path.traverse(visitor);
				} else {
					path.stop();
				}
			},
		}
	};
};
