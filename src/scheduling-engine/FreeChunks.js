import events from '../components/Pages/Profile/_ProfilePageTest';

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
            // TODO: create helper fucnction to create and return chunk objects
            if ((chunk.end <= window.daily_str) || (chunk.str >= window.daily_end)) {
                // ignore
            }
            else {
                if((chunk.str >= window.daily_str) && (chunk.end <= window.daily_end)) {
                    //    new chunk, starting at chunk str, ending at chunk end
                }
                else if ((chunk.str < window.daily_str) && (chunk.end <= window.daily_end)) {
                    //    new chunk, starting at daily str, ending at chunk end
                }
                else if ((chunk.end > window.daily_end) && (chunk.str >= window.daily_str)) {
                    //    new chunk, starting at chunk str, ending at daily end
                }
                else {
                    //    new chunk, starting at daily str, ending at daily end
                }
            }

        }
        else {
        //    split chunk into daily pieces, for each piece, only get part within daily window
            let day;
            for (day = chunk.str.day; day <= chunk.end.day;day++ ) {
                if (day === chunk.str.day) {
                    if (chunk.str < window.daily_str) {
                        //    new chunk, starting at daily str, ending at daily end
                        createInsertChunk(freeChunks,window.daily_str, window.daily_end)
                    }
                    else if (chunk.str > window.daily_end) {
                        //ignore
                    }
                    else {
                        //    new chunk, starting at chunk str, ending at daily end
                        createInsertChunk(freeChunks,chunk.str, window.daily_end)
                    }
                }
                else if (day === chunk.end.day) {
                    if (chunk.end < window.daily_str) {
                        // ignore
                    }
                    else if (chunk.end > window.daily_end) {
                        //    new chunk, starting at daily str, ending at daily end
                        createInsertChunk(freeChunks,window.daily_str, window.daily_end)
                    }
                    else {
                        //    new chunk, starting at daily str, ending at chunk end
                        createInsertChunk(freeChunks,window.daily_str, chunk.end)
                    }
                }
                else {
                    //    new chunk, starting at daily str, ending at daily end
                    createInsertChunk(freeChunks,window.daily_str, window.daily_end)
                }
            }
        }
    });
    return freeChunks
}

function createInsertChunk(freeChunkList, start, end) {
    freeChunkList.push({str: start, end: end})
}

export { getFreeChunks, getUserDefs, getTotalChunks, createInsertChunk };