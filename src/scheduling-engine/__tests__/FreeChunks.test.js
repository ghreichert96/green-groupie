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
let events1 = [{end: {dateTime: "2019-04-15T09:00:00-05:00"},
    start: {dateTime: "2019-04-15T08:00:00-05:00"}},
    {end: {dateTime: "2019-04-17T21:30:00-05:00"},
        start: {dateTime: "2019-04-17T21:00:00-05:00"}}];
test('test_getTotalChunks1', () => {
    expect(getTotalChunks(events1)).toEqual(
        [{str:"2019-04-15T09:00:00-05:00", end:"2019-04-17T21:00:00-05:00"}]
    );
});

// Slots end past wdw start, and start before window end, huge chunk in mdiddle
// PASS
let events2 = [{end: {dateTime: "2019-04-15T09:30:00-05:00"},
    start: {dateTime: "2019-04-15T08:00:00-05:00"}},
    {end: {dateTime: "2019-04-17T21:30:00-05:00"},
        start: {dateTime: "2019-04-17T20:00:00-05:00"}}];
test('test_getTotalChunks2', () => {
    expect(getTotalChunks(events2)).toEqual(
        [{str:"2019-04-15T09:30:00-05:00", end:"2019-04-17T20:00:00-05:00"}]
    );
});

// Slots past window start, before window end, and event in middle of the day
// PASS
// let events3 = [{end: {dateTime: "2019-04-15T09:30:00-05:00"},
//     start: {dateTime: "2019-04-15T08:00:00-05:00"}},
//     {end: {dateTime: "2019-04-16T15:33:00-05:00"},
//         start: {dateTime: "2019-04-16T14:00:00-05:00"}},
//     {end: {dateTime: "2019-04-17T10:30:00-05:00"},
//         start: {dateTime: "2019-04-17T09:00:00-05:00"}}];
// test('test_getTotalChunks3', () => {
//     expect(getTotalChunks(events3)).toEqual(
//         [{str:"2019-04-15T09:30:00-05:00", end:"2019-04-16T14:00:00-05:00"},
//                     {str:"2019-04-16T15:33:00-05:00", end:"2019-04-17T09:00:00-05:00"}]
//     );
// });

//many slots throughout the day PASS
// let events4 = [{end: {dateTime: "2019-04-15T12:30:00-05:00"},
//     start: {dateTime: "2019-04-15T10:00:00-05:00"}},
//     {end: {dateTime: "2019-04-15T15:33:00-05:00"},
//         start: {dateTime: "2019-04-15T14:00:00-05:00"}},
//     {end: {dateTime: "2019-04-17T10:30:00-05:00"},
//         start: {dateTime: "2019-04-17T09:00:00-05:00"}}];
// test('test_getTotalChunks4', () => {
//     expect(getTotalChunks(events4)).toEqual(
//         [{str:"2019-04-15T09:00:00-05:00", end:"2019-04-15T10:00:00-05:00"},
//             {str:"2019-04-15T12:30:00-05:00", end:"2019-04-15T14:00:00-05:00"},
//             {str:"2019-04-15T15:33:00-05:00", end:"2019-04-17T09:00:00-05:00"}]
//     );
// });

// overlapping events PASS
// let events5 = [{end: {dateTime: "2019-04-15T12:30:00-05:00"},
//     start: {dateTime: "2019-04-15T10:00:00-05:00"}},
//     {end: {dateTime: "2019-04-15T15:33:00-05:00"},
//         start: {dateTime: "2019-04-15T12:00:00-05:00"}},
//     {end: {dateTime: "2019-04-17T10:30:00-05:00"},
//         start: {dateTime: "2019-04-17T09:00:00-05:00"}}];
// test('test_getTotalChunks5', () => {
//     expect(getTotalChunks(events5)).toEqual(
//         [{str:"2019-04-15T09:00:00-05:00", end:"2019-04-15T10:00:00-05:00"},
//             {str:"2019-04-15T15:33:00-05:00", end:"2019-04-17T09:00:00-05:00"}]
//     );
// });

// complicated overlap(2 overlaps, ending past window end) PASS
let events6 = [{end: {dateTime: "2019-04-15T12:30:00-05:00"},
    start: {dateTime: "2019-04-15T10:00:00-05:00"}},
    {end: {dateTime: "2019-04-17T08:33:00-05:00"},
        start: {dateTime: "2019-04-15T12:00:00-05:00"}},
    {end: {dateTime: "2019-04-17T10:30:00-05:00"},
        start: {dateTime: "2019-04-17T07:00:00-05:00"}}];
test('test_getTotalChunks6', () => {
    expect(getTotalChunks(events6)).toEqual(
        [{str:"2019-04-15T09:00:00-05:00", end:"2019-04-15T10:00:00-05:00"}]
    );
});

// --------------------- END OF TOTAL CHUNKS TESTS ---------------------------


// --------------------- START OF FREE CHUNKS TESTS ---------------------------

// free chunk, entire day free, only one day PASS

let events7 = [{end: {dateTime: "2019-04-15T09:00:00-05:00"},
    start: {dateTime: "2019-04-15T08:00:00-05:00"}},
    {end: {dateTime: "2019-04-15T21:33:00-05:00"},
        start: {dateTime: "2019-04-15T21:00:00-05:00"}}];
test('test_getFreeChunks1', () => {
    expect(getFreeChunks(events7)).toEqual(
        [{str:"2019-04-15T09:00:00-05:00", end:"2019-04-15T21:00:00-05:00"}]
    );
});

// Two entire days free, should break into two full day chunks
// let events8 = [{end: {dateTime: "2019-04-15T09:30:00-05:00"},
//     start: {dateTime: "2019-04-15T08:00:00-05:00"}},
//     {end: {dateTime: "2019-04-17T21:30:00-05:00"},
//         start: {dateTime: "2019-04-17T20:00:00-05:00"}}];
// test('test_getFreeChunks2', () => {
//     expect(getFreeChunks(events8)).toEqual(
//         [{str:"2019-04-15T09:00:00-05:00", end:"2019-04-15T21:00:00-05:00"},
//                     {str:"2019-04-16T09:00:00-05:00", end:"2019-04-16T21:00:00-05:00"},
//                     {str:"2019-04-17T09:00:00-05:00", end:"2019-04-17T21:00:00-05:00"}]
//     );
// });

// --------------------- END OF FREE CHUNKS TESTS ---------------------------

