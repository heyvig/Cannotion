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
    expect(events_arr[7].link).toBe('https://ufl.instructure.com/courses/371493/calendar_events/2462577');
    events_arr.length = 0;
});

//Tests that the zoom link is correctly parsed
test('test event link', () => {
    events_arr = parseFile(test_file);
    expect(events_arr[3].link).toBe('https://ufl.zoom.us/j/97191683079?pwd=UGJmQzdoeCtXR3psbWNFLzVmekpsZz09');
    events_arr.length = 0;
});

//Tests that the assignment is correctly parsed
test('test assignment link', () => {
    events_arr = parseFile(test_file);
    expect(events_arr[0].link).toBe('http://ufl.instructure.com/courses/447867/assignments/5147674');
    events_arr.length = 0;
});

//Tests that title is correctly parsed
test('test title', () => {
    events_arr = parseFile(test_file);
    expect(events_arr[0].title).toBe('Chapter 5 End of Chapter Exercises ');
    events_arr.length = 0;
});

//Tests that class is correctly parsed
test('test class', () => {
    events_arr = parseFile(test_file);
    expect(events_arr[0].class).toBe('CEN3031 - Intro to SWE');
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

//Tests that the class type is being parsed
test('test correct class type', () => {
    events_arr = parseFile(test_file);
    expect(events_arr[30].type).toBe('Class');

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
