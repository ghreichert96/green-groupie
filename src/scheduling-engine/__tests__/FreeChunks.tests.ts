import { getFreeChunks, getUserDefs, getTotalChunks, createInsertChunk, getEventsList } from '../FreeChunks';

test('test_getUserDefs', () => {
    expect(getUserDefs()).toEqual(
        {
            daily_str: '08:00:00',
            daily_end: '20:00:00',
            str: '2019-04-15T08:00:00-05:00',
            end: '2019-04-15T20:00:00-05:00'
        }
    );
});

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

test('test_getTotalChunks', () => {
    expect(getTotalChunks()).toEqual(
        [{str:"2019-04-15T08:00:00-05:00",end:"2019-04-15T10:00:00-05:00"},
            {str:"2019-04-15T11:00:00-05:00", end:"2019-04-15T20:00:00-05:00"}]
    );
});
