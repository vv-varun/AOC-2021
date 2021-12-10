const fs = require('fs');
const { removeAllListeners } = require('process');

const fileData = fs.readFileSync('./inputFiles/day8.txt', 'utf8');
const inputArray = fileData.split("\n");
const input = inputArray.map(v=>{
    let spl = v.split(" | ");
    return {
        signal: spl[0].split(" "),
        output: spl[1].split(" ")
    }
});

const wires = 'abcdefg';
const combinations = _getCombinations(wires);

//const correctMapping = ['','','','','','','','','',''];
const correctMapping = {
    '':0,
    '':1,
    '':2,
    '':3,
    '':4,
    '':5,
    '':6,
    '':7,
    '':8,
    '':9
}
//console.log(input);


let startTime = Date.now();
//part1();
let endTime = Date.now();
console.log(`${endTime - startTime} milliseconds to complete Part 1`);

startTime = Date.now();
//test()
part2();
endTime = Date.now();
console.log(`${endTime - startTime} milliseconds to complete Part 2`);

function part1(){

    console.log("====== Part 1 =======");

    let counts = input.map(v => {
        return v.output.reduce((p,c)=>{
            if(c.length == 2 || c.length == 4 || c.length == 3 || c.length == 7){
                return p + 1;
            }
            else{
                return p;
            }
        },0);
    });

    //console.log(input[0].output);console.log(input[1].output);console.log(input[2].output);
    //console.log("Counts", counts);
    let sum = counts.reduce((p,c)=>{return p+c}, 0);
    console.log("Part 1: ", sum);

    console.log("________ End of Part 1 ________");
}

function part2(){

    console.log("====== Part 2 =======");

    
    //console.log(`${combinations.length} combinations in `, combinations);

    for (let index = 0; index < input.length; index++) {

        const inp = input[index];

        let possibleCombination = _findPossibleMappings(inp.signal);
        if(possibleCombination){
            let maps = _getNumbersForMapping(possibleCombination);
            let actualNumbers = inp.output.map((n)=>{
                return _getNumberForMapValue(maps,n);
            });

            let num = Number(actualNumbers.join(''));
            inp.actualOutput = num;
        }
        else{
            console.log("Something wrong... dont take this answer");
        }
    }

    //console.log("After decoding", input);
    let sum = input.reduce((p,c)=> {
        return p + c.actualOutput;
    },0);

    console.log("Part 2 answer:", sum);
    
    console.log("________ End of Part 2 ________");
}

function test(){

    let filterCombinations = combinations;

    filterCombinations = _filterForMap({mapped: 'ab', actual: 'cf'}, filterCombinations);
    filterCombinations = _filterForMap({mapped: 'dab', actual: 'acf'}, filterCombinations);
    filterCombinations = _filterForMap({mapped: 'eafb', actual: 'bcdf'}, filterCombinations);
    filterCombinations = _filterForMap({mapped: 'acedgfb', actual: 'abcdefg'}, filterCombinations);

    //filterCombinations = _filterForMap({mapped: 'cdfbe', actual: 'abdfg'}, filterCombinations);
    filterCombinations = filterCombinations.filter(comb => {

        let maps = _getNumbersForMapping(comb);
        maps.five = _getCombinations(maps.five);
        maps.two = _getCombinations(maps.two);
        maps.three = _getCombinations(maps.three);
        if(maps.five.includes('cdfbe') && maps.two.includes('gcdfa')){
            return true;
        }

    });
    
    console.log("Filtered combinations", filterCombinations);

}

function _findPossibleMappings(array){

    let one = array.filter((v)=>{return v.length == 2});
    let seven = array.filter((v)=>{return v.length == 3});
    let four = array.filter((v)=>{return v.length == 4});
    let eight = array.filter((v)=>{return v.length == 7});

    let filterCombinations = combinations;
    one.forEach(o => {
        filterCombinations = _filterForMap({mapped: o, actual: 'cf'}, filterCombinations);
    });
    if(filterCombinations.length == 1){
        return filterCombinations[0];
    }
    
    seven.forEach(s => {
        filterCombinations = _filterForMap({mapped: s, actual: 'acf'}, filterCombinations);
    });
    if(filterCombinations.length == 1){
        return filterCombinations[0];
    }

    four.forEach(f => {
        filterCombinations = _filterForMap({mapped: f, actual: 'bcdf'}, filterCombinations);
    });
    if(filterCombinations.length == 1){
        return filterCombinations[0];
    }

    // No nned to filter by 8 - because it has all and something will always map..
    // eight.forEach(e => {
    //     filterCombinations = _filterForMap({mapped: e, actual: 'abcdefg'}, filterCombinations);
    // });
    // if(filterCombinations.length == 1){
    //     return filterCombinations[0];
    // }

    let trialNumbers = array.filter((v)=>{return v.length == 5});   // This can be 2, 5 or 3
    //console.log("Trial numbers", trialNumbers);

    trialNumbers.forEach(trainNumber => {
        // This can be 2, 5 or 3
        filterCombinations = filterCombinations.filter(comb => {

            let maps = _getNumbersForMapping(comb);
            maps.five = _getCombinations(maps.five);
            maps.two = _getCombinations(maps.two);
            maps.three = _getCombinations(maps.three);
            if(maps.five.includes(trainNumber) || maps.two.includes(trainNumber) || maps.three.includes(trainNumber)){
                return true;
            }
    
        });
        
    });

    if(filterCombinations.length == 1){
        return filterCombinations[0];
    }

    if(filterCombinations.length > 2){
        console.log(`More filtering required for`, array);
    }

    return undefined;
}

function _getCombinations(charSeq){

    //console.log("Calculating cobos of", charSeq);
    let combinations = [];

    if(charSeq.length == 1){
        return [charSeq];
    }

    for(let a=0; a<charSeq.length; a++){

        let c = charSeq.charAt(a);
        let remString = charSeq.replace(c,'');
        let remStringCombinations = _getCombinations(remString);

        remStringCombinations.forEach(comb => {
            combinations.push(c + comb);
        });
    }

    //console.log(`Comb of ${charSeq}`, combinations);
    return combinations;
}

function _filterForMap(map, combinations){

    //console.log("Filtering for", map);

    let indexArray = [];
    for (let index = 0; index < map.actual.length; index++) {
        indexArray.push(wires.indexOf(map.actual.charAt(index)));
    }

    let filterCombinations = combinations.filter((combination)=>{

        let chars = [];
        indexArray.forEach(ind => {
            chars.push(combination.charAt(ind));
        });

        mappedComb = chars.join('');

        mappedCombinations = _getCombinations(mappedComb);
        if(mappedCombinations.includes(map.mapped)){
            return true;
        }
        
    });

    return filterCombinations;
}

function _getNumbersForMapping(mapping){

    let zero = mapping.charAt(0) + mapping.charAt(1) + mapping.charAt(2) + mapping.charAt(4) + mapping.charAt(5) + mapping.charAt(6);
    let one = mapping.charAt(2) + mapping.charAt(5);
    let two = mapping.charAt(0) + mapping.charAt(2) + mapping.charAt(3) + mapping.charAt(4) + mapping.charAt(6);
    let three = mapping.charAt(0) + mapping.charAt(2) + mapping.charAt(3) + mapping.charAt(5) + mapping.charAt(6);
    let four = mapping.charAt(1) + mapping.charAt(2) + mapping.charAt(3) + mapping.charAt(5);
    let five = mapping.charAt(0) + mapping.charAt(1) + mapping.charAt(3) + mapping.charAt(5) + mapping.charAt(6)
    let six = mapping.charAt(0) + mapping.charAt(1) + mapping.charAt(3) + mapping.charAt(4) + mapping.charAt(5) + mapping.charAt(6)
    let seven = mapping.charAt(0) + mapping.charAt(2) + mapping.charAt(5)
    let eight = mapping.charAt(0) + mapping.charAt(1) + mapping.charAt(2) + mapping.charAt(3) + mapping.charAt(4) + mapping.charAt(5) + mapping.charAt(6);
    let nine = mapping.charAt(0) + mapping.charAt(1) + mapping.charAt(2) + mapping.charAt(3) + mapping.charAt(5) + mapping.charAt(6);

    return{
        zero: zero,
        one: one,
        two: two,
        three: three,
        four: four,
        five: five,
        six: six,
        seven: seven,
        eight: eight,
        nine: nine,
    }
}

function _getNumberForMapValue(map, value){

    if(value.length == 2){
        return 1;
    }
    if(value.length == 3){
        return 7;
    }
    if(value.length == 4){
        return 4;
    }
    if(value.length == 5){
        if(_getCombinations(map.two).includes(value)){
            return 2;
        }
        if(_getCombinations(map.three).includes(value)){
            return 3;
        }
        if(_getCombinations(map.five).includes(value)){
            return 5;
        }

    }
    if(value.length == 6){
        if(_getCombinations(map.zero).includes(value)){
            return 0;
        }
        if(_getCombinations(map.six).includes(value)){
            return 6;
        }
        if(_getCombinations(map.nine).includes(value)){
            return 9;
        }
    }
    if(value.length == 7){
        return 8;
    }
}