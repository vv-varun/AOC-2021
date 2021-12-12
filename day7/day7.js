const fs = require('fs');

const fileData = fs.readFileSync(__dirname + '/input.txt', 'utf8');
const inputArray = fileData.split(",").map((v)=>{return Number(v)});
//console.log(inputArray);

let startTime = Date.now();
part1();
let endTime = Date.now();
console.log(`${endTime - startTime} milliseconds to complete Part 1`);

startTime = Date.now();
part2();
endTime = Date.now();
console.log(`${endTime - startTime} milliseconds to complete Part 2`);

//test()

function part1(){

    console.log("====== Part 1 =======");

    let fuelArray = [];
    for (let index = 0; index <= 1885; index++) {
        fuelArray.push({index: index, fuel: _getDistance(inputArray, index)});
    }

    fuelArray.sort((a,b)=>{
        return a.fuel - b.fuel;
    });

    //console.log("Fuel Consumption", fuelArray);
    console.log("Part 1: ", fuelArray[0]);

    console.log("________ End of Part 1 ________");
}

function test(){

    let input = [10,16,11,12,30,50];
    //input = inputArray;

    let stats = _calculateStats(input);
    console.log("Stats: ", stats);

    let n = 10; console.log(`Fuel for position ${n} is: ${_getDistance(input, n)}`);
    //n = 20;console.log(`Fuel for position ${n} is: ${_getDistance(input, n)}`);
    //n = 30;console.log(`Fuel for position ${n} is: ${_getDistance(input, n)}`);
    //n = 40;console.log(`Fuel for position ${n} is: ${_getDistance(input, n)}`);
    n = Math.ceil(stats.mean);console.log(`Fuel for position ${n} is: ${_getDistance(input, n)}`);
    n = Math.floor(stats.mean);console.log(`Fuel for position ${n} is: ${_getDistance(input, n)}`);

    n = Math.ceil(stats.median);console.log(`Fuel for position ${n} is: ${_getDistance(input, n)}`);
    n = Math.floor(stats.median);console.log(`Fuel for position ${n} is: ${_getDistance(input, n)}`);

    // let fuelArray = [];
    // for (let index = stats.min; index <= stats.max; index++) {
    //     fuelArray.push({index: index, fuel: _getDistance(input, index)});
    // }
    // fuelArray.sort((a,b)=>{
    //     return a.fuel - b.fuel;
    // });
    // console.log("Min fuel:", fuelArray[0]);

}

function part2(){

    console.log("====== Part 2 =======");
    
    let fuelArray = [];
    for (let index = 0; index <= 1885; index++) {
        fuelArray.push({index: index, fuel: _getPart2Fuel(inputArray, index)});
    }

    fuelArray.sort((a,b)=>{
        return a.fuel - b.fuel;
    });

    console.log("Part 2: ", fuelArray[0]);

    console.log("________ End of Part 2 ________");
}

function _calculateStats(array){

    array.sort((a,b)=>{return a-b});

    let count = array.length;

    let min = array[0];
    let max = array[array.length - 1];  
    let median = (max - min) / 2;
    let midNo = undefined;

    if(count % 2 == 0){
        // Even
        midNo = (array[count / 2] + array[count/2 - 1])/2;
    }
    else{
        midNo = array[Math.floor(count/2)];
    }

    let sum = array.reduce((p,c)=>{
        return p + Number(c);
    },0);

    let mean = sum / array.length;
    
    let counts = _count(array);
    let wsum = 0;
    for (const [key, value] of Object.entries(counts)) {
        wsum = wsum + key * value;
    }
    //console.log("Weighted sum:", wsum);
    //console.log("Weighted avg:", wsum / inputArray.length);

    return {
        min: min,
        max: max,
        sum: sum,
        mean: mean,
        median: median,
        midNo: midNo,
        count: count
    }

}

function _count(array){

    let counts = {};
    array.forEach(e => {
        if(counts[e]){
            counts[e] = counts[e] + 1;
        }
        else{
            counts[e] = 1;
        }
    });

    return counts;
}

function _getDistance(array, point){

    fuelArray = array.map((v)=>{
        return Math.abs(point - Number(v));
    });

    fuelSum = fuelArray.reduce((p,c)=>{
        return p + Number(c);
    },0);

    return fuelSum;

}

function _getPart2Fuel(array, point){

    fuelArray = array.map((v)=>{
        let dist = Math.abs(point - Number(v));
        return (1+dist)*dist/2;
    });

    fuelSum = fuelArray.reduce((p,c)=>{
        return p + Number(c);
    },0);

    return fuelSum;

}