const corealg = require('./scheduling-engine/core-algorithm');

function findSlots(freeSlots) {
    console.log('ITS HERE')
    const chunks = getUserDefs()
    const freeChunks = getFreeChunks(chunks);
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