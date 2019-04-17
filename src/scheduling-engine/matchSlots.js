import {getFreeChunks, getUserDefs, getTotalChunks, createInsertChunk, exportChunk} from './FreeChunks';

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

export default {meeting, matchChunks}