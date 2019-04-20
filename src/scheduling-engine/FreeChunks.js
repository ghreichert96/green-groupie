import events from '../../src/components/Pages/Profile/_ProfilePageTest';

function getUserDefs() {
    // make firebase request to get user definitions
    return {
        daily_str: '09:00:00',
        daily_end: '21:00:00',
        str: '2019-04-15T09:00:00-05:00',
        end: '2019-04-15T21:00:00-05:00',
        duration: 30

    }
}

function getEventsList() {
    return [{end: {dateTime: "2019-04-15T09:00:00-05:00"},
            start: {dateTime: "2019-04-15T08:00:00-05:00"}},
            {end: {dateTime: "2019-04-17T21:33:00-05:00"},
            start: {dateTime: "2019-04-17T21:00:00-05:00"}}]
            // {end: {dateTime: "2019-04-17T10:30:00-05:00"},
            // start: {dateTime: "2019-04-17T07:00:00-05:00"}}]
    // {end: {dateTime: "2019-04-24T08:40:00-05:00"}, start: {dateTime: "2019-04-T22:10:00-05:00"}}]
            // {end: {dateTime: "2019-04-24T15:33:00-05:00"}, start: {dateTime: "2019-04-24T14:00:00-05:00"}},
            // {end: {dateTime: "2019-04-01T15:55:00-05:00"}, start: {dateTime: "2019-04-01T14:10:00-05:00"}},
            // {end: {dateTime: "2019-04-02T07:00:00-05:00"}, start: {dateTime: "2019-04-01T20:20:00-05:00"}},
            // // {end: {date: "2017-03-28"}, start: {date: "2017-03-26"}}
            // {end: {dateTime: "2019-04-17T17:10:00-05:00"}, start: {dateTime: "2019-04-17T08:40:00-05:00"}},
            // {end: {dateTime: "2019-04-18T07:55:00-05:00"}, start: {dateTime: "2019-04-18T06:15:00-05:00"}},
            // {end: {dateTime: "2019-04-26T18:45:00-05:00"}, start: {dateTime: "2019-04-26T17:06:00-05:00"}}]
}
// TODO: deal with wrong events(start after end)

function getTotalChunks(events) {
    let totalChunks = [];
    const window = getUserDefs();
    let curr_ev = events[0];
    const last_event = events[events.length - 1];
    if (events) {
        if (curr_ev.start.dateTime > window.str) {
            totalChunks.push({str: window.str, end: curr_ev.start.dateTime});
        }
        if (window.end > last_event.end.dateTime) {
            totalChunks.push({str: last_event.end.dateTime, end: window.end});
        }
        if (events.length >=2) { events.forEach(function (event) {
            if (curr_ev !== event) {
                if (curr_ev.end.dateTime < event.start.dateTime) {
                    if (window.end >= event.start.dateTime) {
                        totalChunks.push({str:curr_ev.end.dateTime, end: event.start.dateTime});
                    }
                    else {}
                    curr_ev = event;
                }
                else {
                    curr_ev = event;
                }
            }

        })}
      }
    return totalChunks
}

function getFreeChunks(events) {
    const freeChunks = [];
    const totalChunks = getTotalChunks(events);
    const window = getUserDefs();
    totalChunks.forEach(function(chunk) {
        let day_str = chunk.str.split('T')[0];
        let day_end = chunk.end.split('T')[0];
        let timezone = chunk.str.split('-').pop();
        let daily_str = new Date(day_str + "T" + window.daily_str + "-" + timezone);
        let daily_end = new Date(day_end + "T" + window.daily_end + "-" + timezone);
        if (daily_str.getDay() === daily_end.getDay()) {
            if ((chunk.end <= daily_str) || (chunk.str >= daily_end)) {
                // ignore
            }
            else {
                if((chunk.str >= daily_str) && (chunk.end <= daily_end)) {
                    //    new chunk, starting at chunk str, ending at chunk end
                    freeChunks.push({str: chunk.str, end: chunk.end})
                }
                else if ((chunk.str < daily_str) && (chunk.end <= daily_end)) {
                    //    new chunk, starting at daily str, ending at chunk end
                    freeChunks.push({str: daily_str, end: chunk.end})
                }
                else if ((chunk.end > daily_end) && (chunk.str >= daily_str)) {
                    //    new chunk, starting at chunk str, ending at daily end
                    freeChunks.push({str: chunk.str , end: daily_end})
                }
                else {
                    //    new chunk, starting at daily str, ending at daily end
                    freeChunks.push({str: daily_str , end: daily_end})
                }
            }

        }
        else {
        //    split chunk into daily pieces, for each piece, only get part within daily window
            let day;
            for (day = daily_str.getDay(); day <= daily_end.getDay(); day++ ) {
                if (day === daily_str.getDay()) {
                    if (chunk.str < daily_str) {
                        //    new chunk, starting at daily str, ending at daily end
                        freeChunks.push({str: daily_str, end: daily_end})
                    }
                    else if (chunk.str > daily_end) {
                        //ignore
                    }
                    else {
                        //    new chunk, starting at chunk str, ending at daily end
                        freeChunks.push({str: chunk.str, end: daily_end})
                    }
                }
                else if (day === daily_end.getDay()) {
                    if (chunk.end < daily_str) {
                        // ignore
                    }
                    else if (chunk.end > daily_end) {
                        //    new chunk, starting at daily str, ending at daily end
                        freeChunks.push({str: daily_str, end: daily_end})
                    }
                    else {
                        //    new chunk, starting at daily str, ending at chunk end
                        freeChunks.push({str: daily_str, end: chunk.end})
                    }
                }
                else {
                    //    new chunk, starting at daily str, ending at daily end
                    freeChunks.push({str: daily_str, end: daily_end})
                }
            }
        }
    });
    return freeChunks
}


export { getTotalChunks, getFreeChunks } ;