const { parseFile, parseLink } = require('../src/parser.js');
const empty = require('./0Events');
const test_file = require('./test_file')
// let events_arr = [];

//Tests that nothing is returned on parsing an "empty" calendar
test('test empty calendar', () => {
    expect(parseFile(empty)).toBe();
});

//Tests that the zoom link is correctly parsed
test('test zoom link', () => {
    events_arr = parseFile(test_file);
    expect(events_arr[3].link).toBe('https://ufl.zoom.us/j/97191683079?pwd=UGJmQzdoeCtXR3psbWNFLzVmekpsZz09');
    events_arr.length = 0;
});

//Tests that the correct type is being parsed
test('test correct event type assignment', () => {
    events_arr = parseFile(test_file);
    expect(events_arr[0].type).toBe('Assignment');
    expect(events_arr[1].type).toBe('Assignment');
    expect(events_arr[2].type).toBe('Assignment');
    expect(events_arr[3].type).toBe('Office Hours');
    expect(events_arr[4].type).toBe('Office Hours');
    expect(events_arr[5].type).toBe('Assignment');
    expect(events_arr[6].type).toBe('Office Hours');
    expect(events_arr[7].type).toBe('Event');

    events_arr.length = 0;
});

//Tests that 11:59 is implemented properly with regards to date and 24-hr time format
test('test 11:59 assignment', () => {
    events_arr = parseFile(test_file);
    expect(events_arr[0].hour).toBe(23);
    expect(events_arr[0].minute).toBe(59);
    expect(events_arr[0].day).toBe(18);
    expect(events_arr[0].month).toBe("Mar");

    events_arr.length = 0;
});

//Tests that the number of events is properly parsed
test('test number of events', () => {
    events_arr = parseFile(test_file);
    expect(events_arr.length).toBe(160);
    events_arr.length = 0;
});
