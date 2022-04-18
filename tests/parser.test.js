const parseFile = require('../src/parser.js');
const empty = require('./0Events');
const dst = require('./2DuplicateEventDaylightSavings');
const large_file = require('./200Events');
const test_file = require('./test_file')
// let events_arr = [];
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
    events_arr.length = 0;
});

//Tests that the zoom link is correctly parsed
test('test zoom link', () => {
    events_arr = parseFile(large_file);
    expect(events_arr[1].link).toBe('https://ufl.zoom.us/j/97191683079?pwd=UGJmQzdoeCtXR3psbWNFLzVmekpsZz09');
    events_arr.length = 0;
});

//Tests that the correct type is being parsed
test('test correct event type assignment', () => {
    events_arr = parseFile(large_file);
    var i = 0;
    expect(events_arr[0].type).toBe('Quiz');
    expect(events_arr[1].type).toBe('Office Hours');
    expect(events_arr[2].type).toBe('Office Hours');
    expect(events_arr[3].type).toBe('Office Hours');
    expect(events_arr[4].type).toBe('Assignment');
    events_arr.length = 0;
});

//Tests that 11:59 exception is implemented properly
test('test 11:59 assignment', () => {
    events_arr = parseFile(large_file);
    expect(events_arr[19].startHour).toBe(23);
    expect(events_arr[19].startMinute).toBe(59);
    events_arr.length = 0;
});

//Tests that the number of events is properly parsed
test('test number of events', () => {
    events_arr = parseFile(test_file);
    expect(events_arr.length).toBe(200);
    events_arr.length = 0;
});