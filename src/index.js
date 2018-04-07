const SRC_FILE_PATT = /\.pure\.jsx?|unknown$/;

module.exports = function testPlugin(babel) {
	return {
		visitor: {
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
		}
	};
};
