const babel = require('babel-core');
const plugin = require('../src');

describe('variable declaration', () => {
	it('prohibits var', () => {
		expect(() => babel.transform('var foo = 1;', { plugins: [plugin] }) ).toThrow();
	});
	it('prohibits let', () => {
		expect(() => babel.transform('let foo = 1;', { plugins: [plugin] }) ).toThrow();
	});
	it('allows const', () => {
		const { code } = babel.transform('const foo = 1;', { plugins: [plugin] });
		expect(code).toMatchSnapshot();
	});
});

describe('assignment', () => {
	it('prohibits variable assignment', () => {
		expect(() => babel.transform('foo = 1;', { plugins: [plugin] }) ).toThrow();
	});
	it('prohibits variable += assignment', () => {
		expect(() => babel.transform('foo += 1;', { plugins: [plugin] }) ).toThrow();
	});
	it('prohibits variable -= assignment', () => {
		expect(() => babel.transform('foo += 1;', { plugins: [plugin] }) ).toThrow();
	});
	it('prohibits property assignment', () => {
		expect(() => babel.transform('foo.bar = 1;', { plugins: [plugin] }) ).toThrow();
	});
	it('prohibits indexed assignment', () => {
		expect(() => babel.transform('foo["bar"] = 1;', { plugins: [plugin] }) ).toThrow();
	});
	it('prohibits array assignment', () => {
		expect(() => babel.transform('foo[0] = 1;', { plugins: [plugin] }) ).toThrow();
	});

	it('prohibits variable increment and decrement', () => {
		expect(() => babel.transform('foo++;', { plugins: [plugin] }) ).toThrow();
		expect(() => babel.transform('foo++;', { plugins: [plugin] }) ).toThrow();
		expect(() => babel.transform('++foo;', { plugins: [plugin] }) ).toThrow();
		expect(() => babel.transform('--foo;', { plugins: [plugin] }) ).toThrow();
	});
});

describe('this', () => {
	it('prohibits this', () => {
		expect(() => babel.transform('this.foo();', { plugins: [plugin] }) ).toThrow();
	});
});
