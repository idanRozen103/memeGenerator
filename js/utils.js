'use strict';

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}


function findIdxById(Id,arr) {
    var Idx = arr.findIndex(function (object) {
        return object.id === Id
    })
    return Idx
}