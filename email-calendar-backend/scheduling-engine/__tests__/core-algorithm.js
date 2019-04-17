import events from '../../src/components/Pages/Profile/_ProfilePageTest';
import {getFreeChunks, getUserDefs, getTotalChunks, createInsertChunk, exportChunk} from './FreeChunks';
import {getFreeChunks, getUserDefs, getTotalChunks, createInsertChunk, exportChunk} from './FreeChunks';


Class Slots {
    constructor(slot) {
        this.str = slot.str;
        this.end = slot.end;
    }

    function findSlots(freeSlots) {
        const freeChunks = getFreeChunks();
        const proposedSlots = matchChunks(freeChunks);
        proposedSlots.forEach(function (proposedSlot) {
            if (JSON.stringify(proposedSlot) in freeSlots) {
                freeSlots[JSON.stringify(proposedSlot)] = freeSlots[JSON.stringify(proposedSlot)] +1;
            }
            else {
                freeSlots[JSON.stringify(proposedSlot)] = 1;
            }
        });
        return freeSlots
    }
}
function getUserDefs() {
    // make firebase request to get user definitions
    return {
        daily_str: '09:00:00',
        daily_end: '09:00:00',
        str: '2019-04-15T09:00:00-05:00',
        end: '2019-04-17T10:00:00-05:00',
        duration: 30

    }
}

function getEventsList() {
    return [{end: {dateTime: "2019-04-15T11:00:00-05:00"}, start: {dateTime: "2019-04-15T10:00:00-05:00"}},
        {end: {dateTime: "2019-04-16T20:30:00-05:00"}, start: {dateTime: "2019-04-16T21:00:00-05:00"}},
        {end: {dateTime: "2019-04-24T08:40:00-05:00"}, start: {dateTime: "2019-04-23T22:10:00-05:00"}}]
    // {end: {dateTime: "2019-04-24T15:33:00-05:00"}, start: {dateTime: "2019-04-24T14:00:00-05:00"}},
    // {end: {dateTime: "2019-04-01T15:55:00-05:00"}, start: {dateTime: "2019-04-01T14:10:00-05:00"}},
    // {end: {dateTime: "2019-04-02T07:00:00-05:00"}, start: {dateTime: "2019-04-01T20:20:00-05:00"}},
    // // {end: {date: "2017-03-28"}, start: {date: "2017-03-26"}}
    // {end: {dateTime: "2019-04-17T17:10:00-05:00"}, start: {dateTime: "2019-04-17T08:40:00-05:00"}},
    // {end: {dateTime: "2019-04-18T07:55:00-05:00"}, start: {dateTime: "2019-04-18T06:15:00-05:00"}},
    // {end: {dateTime: "2019-04-26T18:45:00-05:00"}, start: {dateTime: "2019-04-26T17:06:00-05:00"}}]
}
// TODO: deal with wrong events(start after end)

function getTotalChunks() {
    let totalChunks = [];
    const window = getUserDefs();
    const events = getEventsList();
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
            if (curr_ev.end.dateTime < event.start.dateTime) {
                if (window.end > event.start.dateTime) {
                    totalChunks.push({str:curr_ev.end.dateTime, end: event.start.dateTime});
                }
                else {

                }

                curr_ev = event;
            }
        })}
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

const duration = 30

function getUserDefs(){
    // import from firebase
    // in milliseconds
    return duration
}

function storeFirebase(){
    // Store the matching slots into firebase
}

function stringToDate(x){
    // Take a string of DateTime format and convert it to JS object of Date relative to universal Time

    // var date = x.split('-')[0]
    // date = Date(date)
    // return date.getTime()

    var date = x.split('-')[0].split('T')[0]
    var time = x.split('-')[0].split('T')[1]
    var timeParts = time.split(':')
    var dateParts = date.split('-')
    var realDate = new Date(dateParts[0], parseInt(dateParts[1], 10) - 1, dateParts[2], timeParts[0], timeParts[1])
    return realDate.getTime()
}

function dateToString(x){
    var d = new Date(0)
    d.setUTCSeconds(x)
}

function matchChunks(){
    let meeting= []
    exportChunk.forEach(element => {
        let start = stringToDate(element.str)
        let end = stringToDate(element.end)
        let gap = end - start
        if (gap < getUserDefs()){
            continue
        }
        if (start % 300000 != 0){
            temp_start = (start / 300000 + 1) * 300000
            if (end - temp_start >= getUserDefs()){
                start = temp_start
            }
        }
        let slot = parseInt(gap/30, 10)
        for (i = 0; i < slot; i++){
            let startTime = start + 300000*i
            if (startTime + getUserDefs() <= end){
                meeting.push({
                    str: dateToString(startTime),
                    end: dateToString(startTime + getUserDefs())
                })
            }
        }
    });
    if (meeting.length === 0){
        return meeting
    }
    return meeting
}

const meeting = matchChunks()


const duration = 30

function getUserDefs(){
    // import from firebase
    // in milliseconds
    return duration
}

function storeFirebase(){
    // Store the matching slots into firebase
}

function stringToDate(x){
    // Take a string of DateTime format and convert it to JS object of Date relative to universal Time

    // var date = x.split('-')[0]
    // date = Date(date)
    // return date.getTime()

    var date = x.split('-')[0].split('T')[0]
    var time = x.split('-')[0].split('T')[1]
    var timeParts = time.split(':')
    var dateParts = date.split('-')
    var realDate = new Date(dateParts[0], parseInt(dateParts[1], 10) - 1, dateParts[2], timeParts[0], timeParts[1])
    return realDate.getTime()
}

function dateToString(x){
    var d = new Date(0)
    d.setUTCSeconds(x)
}

function matchChunks(){
    let meeting= []
    exportChunk.forEach(element => {
        let start = stringToDate(element.str)
        let end = stringToDate(element.end)
        let gap = end - start
        if (gap < getUserDefs()){
            continue
        }
        if (start % 300000 != 0){
            temp_start = (start / 300000 + 1) * 300000
            if (end - temp_start >= getUserDefs()){
                start = temp_start
            }
        }
        let slot = parseInt(gap/30, 10)
        for (i = 0; i < slot; i++){
            let startTime = start + 300000*i
            if (startTime + getUserDefs() <= end){
                meeting.push({
                    str: startTime,
                    end: startTime + getUserDefs()
                })
            }
        }
    });
    if (meeting.length === 0){
        return meeting
    }
    return dateToString(meeting)
}

const meeting = matchChunks()

