import {getFreeChunks, getUserDefs, getTotalChunks, createInsertChunk, exportChunk} from './FreeChunks';
import {matchChunks} from './matchSlots'


function getUserDefs(){
    // import from firebase
    for (i = 0; i <  numUser; i++){
        meetingSlots.push[firebase[i]]
    }
    return numUser, meetingSlots
}

function reconcileCal(){
    getFreeChunks()
    getUserDefs()
    getTotalChunks()
    createInsertChunk()
    matchChunks()
    if (numUser === 0){
        numUser
        storeFirebase()
        return
    }

    let meetingTime = {}

    for (i = 0; i < ; i++){
        
    }

}
