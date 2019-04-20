import { getTotalChunks, getFreeChunks } from '../FreeChunks';

// test('test_getUserDefs', () => {
//     expect(getUserDefs()).toEqual(
//         {
//             daily_str: '08:00:00',
//             daily_end: '20:00:00',
//             str: '2019-04-15T08:00:00-05:00',
//             end: '2019-04-15T20:00:00-05:00'
//         }
//     );
// });


// --------------------- START OF TOTAL CHUNKS TESTS ---------------------------


// test('test_getTotalChunks', () => {
//     expect(getEventsList()[0].start.dateTime).toEqual(
//         "2019-04-15T10:00:00-05:00"
//     );
// });

// test('test_getTotalChunks', () => {
//     expect(getTotalChunks()).toEqual(
//         [{str:"2019-04-15T08:00:00-05:00",end:"2019-04-15T10:00:00-05:00"},
//                     {str:"2019-04-15T11:00:00-05:00", end:"2019-04-15T20:00:00-05:00"}]
//     );
// });

// Slots end at window start and start at window end
// PASS
// events = [{end: {dateTime: "2019-04-15T09:00:00-05:00"},
//     start: {dateTime: "2019-04-15T08:00:00-05:00"}},
//     {end: {dateTime: "2019-04-17T10:30:00-05:00"},
//         start: {dateTime: "2019-04-17T10:00:00-05:00"}}]
// test('test_getTotalChunks', () => {
//     expect(getTotalChunks()).toEqual(
//         [{str:"2019-04-15T09:00:00-05:00", end:"2019-04-17T10:00:00-05:00"}]
//     );
// });

// Slots end past wdw start, and start before window end, huge chunk in mdiddle
// PASS
// events = [{end: {dateTime: "2019-04-15T09:30:00-05:00"},
//     start: {dateTime: "2019-04-15T08:00:00-05:00"}},
//     {end: {dateTime: "2019-04-17T10:30:00-05:00"},
//         start: {dateTime: "2019-04-17T09:00:00-05:00"}}]
// test('test_getTotalChunks', () => {
//     expect(getTotalChunks()).toEqual(
//         [{str:"2019-04-15T09:30:00-05:00", end:"2019-04-17T09:00:00-05:00"}]
//     );
// });

// Slots past window start, before window end, and event in middle of the day
// PASS
// event = [{end: {dateTime: "2019-04-15T09:30:00-05:00"},
//     start: {dateTime: "2019-04-15T08:00:00-05:00"}},
//     {end: {dateTime: "2019-04-16T15:33:00-05:00"},
//         start: {dateTime: "2019-04-16T14:00:00-05:00"}},
//     {end: {dateTime: "2019-04-17T10:30:00-05:00"},
//         start: {dateTime: "2019-04-17T09:00:00-05:00"}}]
// test('test_getTotalChunks', () => {
//     expect(getTotalChunks()).toEqual(
//         [{str:"2019-04-15T09:30:00-05:00", end:"2019-04-16T14:00:00-05:00"},
//                     {str:"2019-04-16T15:33:00-05:00", end:"2019-04-17T09:00:00-05:00"}]
//     );
// });

//many slots throughout the day PASS
// events = [{end: {dateTime: "2019-04-15T12:30:00-05:00"},
//     start: {dateTime: "2019-04-15T10:00:00-05:00"}},
//     {end: {dateTime: "2019-04-15T15:33:00-05:00"},
//         start: {dateTime: "2019-04-15T14:00:00-05:00"}},
//     {end: {dateTime: "2019-04-17T10:30:00-05:00"},
//         start: {dateTime: "2019-04-17T09:00:00-05:00"}}]
// test('test_getTotalChunks', () => {
//     expect(getTotalChunks()).toEqual(
//         [{str:"2019-04-15T09:00:00-05:00", end:"2019-04-15T10:00:00-05:00"},
//             {str:"2019-04-15T12:30:00-05:00", end:"2019-04-15T14:00:00-05:00"},
//             {str:"2019-04-15T15:33:00-05:00", end:"2019-04-17T09:00:00-05:00"}]
//     );
// });

// overlapping events PASS
// events = [{end: {dateTime: "2019-04-15T12:30:00-05:00"},
//     start: {dateTime: "2019-04-15T10:00:00-05:00"}},
//     {end: {dateTime: "2019-04-15T15:33:00-05:00"},
//         start: {dateTime: "2019-04-15T12:00:00-05:00"}},
//     {end: {dateTime: "2019-04-17T10:30:00-05:00"},
//         start: {dateTime: "2019-04-17T09:00:00-05:00"}}]
// test('test_getTotalChunks', () => {
//     expect(getTotalChunks()).toEqual(
//         [{str:"2019-04-15T09:00:00-05:00", end:"2019-04-15T10:00:00-05:00"},
//             {str:"2019-04-15T15:33:00-05:00", end:"2019-04-17T09:00:00-05:00"}]
//     );
// });

// complicated overlap(2 overlaps, ending past window end) PASS
let events = [{end: {dateTime: "2019-04-15T12:30:00-05:00"},
    start: {dateTime: "2019-04-15T10:00:00-05:00"}},
    {end: {dateTime: "2019-04-17T08:33:00-05:00"},
        start: {dateTime: "2019-04-15T12:00:00-05:00"}},
    {end: {dateTime: "2019-04-17T10:30:00-05:00"},
        start: {dateTime: "2019-04-17T07:00:00-05:00"}}];
test('test_getTotalChunks', () => {
    expect(getTotalChunks(events)).toEqual(
        [{str:"2019-04-15T09:00:00-05:00", end:"2019-04-15T10:00:00-05:00"}]
    );
});

// --------------------- END OF TOTAL CHUNKS TESTS ---------------------------


// --------------------- START OF FREE CHUNKS TESTS ---------------------------

// free chunk, entire day free, only one day PASS

let events = [{end: {dateTime: "2019-04-15T09:00:00-05:00"},
    start: {dateTime: "2019-04-15T08:00:00-05:00"}},
    {end: {dateTime: "2019-04-15T21:33:00-05:00"},
        start: {dateTime: "2019-04-15T21:00:00-05:00"}}];
test('test_getFreeChunks', () => {
    expect(getFreeChunks(events)).toEqual(
        [{str:"2019-04-15T09:00:00-05:00", end:"2019-04-15T21:00:00-05:00"}]
    );
});

// Two entire days free, should break into two full day chunks
// test('test_getFreeChunks', () => {
//     expect(getFreeChunks()).toEqual(
//         [{str:"2019-04-15T09:00:00-05:00", end:"2019-04-15T21:00:00-05:00"},
//                     {str:"2019-04-17T09:00:00-05:00", end:"2019-04-17T21:00:00-05:00"}]
//     );
// });

// --------------------- END OF FREE CHUNKS TESTS ---------------------------

