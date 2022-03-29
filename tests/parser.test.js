const parseFile = require('../src/parser.js');
const small_file = require('./2Events.js');
const large_file = require('./20Events');

test('test', () => {
    expect(parseFile(large_file)).toBe(3);
});