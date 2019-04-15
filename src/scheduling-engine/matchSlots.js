import {getFreeChunks, getUserDefs, getTotalChunks, createInsertChunk, exportChunk} from './FreeChunks';

const duration = 30

function getUsrReq(){
    // import from firebase
    return duration
}

function matchReqChunks(){
    let meeting= []
    exportChunk.forEach(element => {
        let gap = element.end - element.str
        if (gap < getUsrReq()){
            continue
        }
        let slot = parseInt(gap/15, 10)
        for (i = 0; i < slot; i++){
            let startTime = element + 15*i 
            if (startTime + getUsrReq() <= element.end){
                meeting.push({
                    str: startTime,
                    end: startTime + getUsrReq()
                })
            }
        }
    });
    if (meeting.length = 0){
        return meeting
    }
    return meeting
}

const meeting = matchReqChunks()

export {meeting}