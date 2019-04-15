import { getFreeChunks, getUserDefs, getTotalChunks, createInsertChunk } from '../FreeChunks';

test('test_getUserDefs', () => {
    expect(getUserDefs()).toEqual(
        {
            daily_str: '09:00:00',
            daily_end: '09:00:00',
            str: '2019-04-15T09:00:00-05:00',
            end: '2019-04-17T10:00:00-05:00'
        }
    );
});

test('test_getTotalChunks', () => {
    expect(getTotalChunks()).toEqual(
        []
    );
});

