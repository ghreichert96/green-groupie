import events from '../src/components/pages/Profile/_ProfilePageTest';

function getUserDefs() {
    // make firebase request to get user definitions
    return {
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
            totalChunks.push([curr_ev.start.dateTime, window.str]);
        }
        if (window.end > last_event.end) {
            totalChunks.push([window.end, last_event.end]);
        }
      events.forEach(function (event) {
          totalChunks.push([curr_ev.end, event.str]);
          curr_ev = event;
      });
      }
    return totalChunks
}

function getFreeChunks() {
    const totalChunks = getTotalChunks();

}
