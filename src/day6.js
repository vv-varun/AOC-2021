const { count } = require('console');
const fs = require('fs');
const { isAbsolute } = require('path');

const fileData = fs.readFileSync('./inputFiles/day6.txt', 'utf8');
const inputArray = fileData.split(",");
//console.log(inputArray);

let startTime = Date.now();
part1();
let endTime = Date.now();
console.log(`${endTime - startTime} milliseconds to complete Part 1`);

startTime = Date.now();
part2();
endTime = Date.now();
console.log(`${endTime - startTime} milliseconds to complete Part 2`);

function part1(){

    console.log("====== Part 1 =======");

    let counter = 1;
    let fishArray = inputArray.slice();
    //console.log("Day 0 fishes", fishArray);

    do {
        
        fishArray = _addDay(fishArray);
        //console.log("*********************");console.log(`After day ${counter} fish array: ${fishArray}`);
        counter++;

    } while (counter <= 80);

    console.log(`${fishArray.length} fishes after 80 days`);
    console.log("________ End of Part 1 ________");
}

function part2(){

    console.log("====== Part 2 =======");
    
    let counts = _count(inputArray);
    //console.log("Orig Counts:", counts);

    let sums = [];

    for (const [key, value] of Object.entries(counts)) {

        //console.log(`${key}: ${value}`);
        if(Number(value) > 0){
            let sum = _simulateBirthExplosion(key, 256);
            sums.push(sum * value);
        }
    }   
    
    //console.log(sums);
    let totalSum = sums.reduce((p,c)=>{return p + c}, 0);
    console.log("Part 2: ", totalSum);

    console.log("________ End of Part 2 ________");
}

function _simulateBirthExplosion(fish, size){

    let fishArray = [fish];
    let day1 = day2 = size / 2;

    // We'll do in 2 parts : 128 + 128
    let newArray = _simulateBirth(fishArray, day1);
    let newCounts = _count(newArray);

    //console.log("New Array counts", newCounts);
    let sums = [];

    for (const [key, value] of Object.entries(newCounts)) {

        //console.log(`${key}: ${value}`);
        let nfa = [key];
        if(Number(value) > 0){
            nfs = _simulateBirth(nfa, day2);
            sums.push(value * nfs.length);
        }
        
    }

    //console.log(sums);
    let totalSum = sums.reduce((p,c)=>{return p + c}, 0);
    return totalSum;
}

function _addDay(array){

    let newFishes = [];
    fishArray = array.map((v)=> {

        if(Number(v) == 0){
            newFishes.push(8);
            return 6;
        }
        else{
            return Number(v) - 1;
        }
    });

    newFishes.forEach((v) => {
        fishArray.push(v);
    });

    return fishArray;
    
}

function _simulateBirth(array, days){

    //console.log(`Original array has ${array.length} fishes`);
    
    let counter = 1;
    let max = days;

    do {
        
        array = _addDay(array);
        counter++;

    } while (counter <= max);

    //console.log(`${array.length} fishes after ${max} days`);

    return array;
}

function _count(array){

    let counts = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0
    };
    array.forEach(e => {
        counts[e] = counts[e] + 1;
    });

    return counts;
}