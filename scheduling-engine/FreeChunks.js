import events from '../src/components/pages/Profile/_ProfilePageTest';

function getUserDefs() {
    // make firebase request to get user definitions
    return {
        daily_str: '09:00:00',
        daily_end: '09:00:00',
        str: '2019-04-15T09:00:00-05:00',
        end: '2019-04-17T10:00:00-05:00'
    }
}


function getTotalChunks() {
    let totalChunks = [];
    const window = getUserDefs();
    let curr_ev = events[0];
    const last_event = events[events.size() - 1 ];
    if (events) {
        if (curr_ev.start.dateTime > window.str) {
            totalChunks.push({str: curr_ev.start.dateTime, end: window.str});
        }
        if (window.end > last_event.end) {
            totalChunks.push({str: window.end, end: last_event.end});
        }
      events.forEach(function (event) {
          totalChunks.push({str:curr_ev.end, end: event.str});
          curr_ev = event;
      });
      }
    return totalChunks
}

function getFreeChunks() {
    const freeChunks = [];
    const totalChunks = getTotalChunks();
    const window = getUserDefs();
    totalChunks.forEach(function(chunk) {
        if (chunk.str.day === chunk.end.day) {
        //    only get part within daily window
        }
        else {
        //    split chunk into daily pieces, for each piece, only get part within daily window
            let day_diff = chunk.end.day - chunk.str.day;
            let day;
            for (day = chunk.str.day; day <= chunk.end.day;day++ ) {
                if (day === chunk.str.day) {
                    //check if start of chunk is before daily start
                    // if not
                        //    new chunk, starting at chunk str, ending at daily end
                    // else
                        // new chunk is btw daily str and daily end
                }
                else if (day === chunk.end.day) {
                    //check if end of chunk is before daily start
                    // if not
                        //    new chunk, starting at daily str, ending at chunk end
                    // else
                        // ignore
                }
                else {
                    //check if end of chunk is before daily start
                    // if not
                        // check if end of chunk is after daily end
                        // if not
                            //    new chunk, starting at daily str, ending at chunk end
                         // else
                            // new chunk, starting at daily str, ending at daily end
                    // else
                        // ignore

                }
            }
        }
    });
}
