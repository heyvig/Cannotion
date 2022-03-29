const parseFile = require('../src/parser.js');
const empty = require('./0Events');
const dst = require('./2DuplicateEventDaylightSavings');
//const large_file = require('./20Events');
//const large_file = require('./20Events');

//Tests that nothing is returned on parsing an "empty" calendar
test('test empty calendar', () => {
    expect(parseFile(empty)).toBe();
});

//Tests that Daylight Savings Time is implemented properly
test('test Daylight Savings', () => {
    let events_arr = parseFile(dst);
    expect(events_arr[0].startHour).toBe(9);
    expect(events_arr[1].startHour).toBe(10);
});