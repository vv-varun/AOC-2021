const fs = require('fs');

const fileData = fs.readFileSync('./inputFiles/day1.txt', 'utf8');
const inputArray = fileData.split("\n");

console.log(inputArray);

let startTime = Date.now();
part1();
let endTime = Date.now();
console.log(`${endTime - startTime} milliseconds to complete Part 1`);

startTime = Date.now();
part2();
endTime = Date.now();
console.log(`${endTime - startTime} milliseconds to complete Part 2`);


// Testing with reduce
console.log("Result from Reduce: ", inputArray.reduce(arrayReduce, 0));

function part1(){

    console.log("====== Part 1 =======");

    let incr = 0;

    for (let index = 1; index < inputArray.length; index++) {
        
        if (Number(inputArray[index]) > Number(inputArray[index-1])) {
            incr++;
        }
        
    }

    console.log("Increase counter", incr);
    console.log("________ End of Part 1 ________");
}

function part2(){

    console.log("====== Part 2 =======");

    let incr = 0;

    for (let index = 3; index < inputArray.length; index++) {
        
        if (Number(inputArray[index]) > Number(inputArray[index-3])) {
            incr++;
        }
        
    }

    console.log("Increase counter", incr);
    
    console.log("________ End of Part 2 ________");
}

function arrayReduce(prev, current, index, array){

    if (Number(current) > Number(array[index - 1])) {
        return Number(prev) + Number(current);
    }
    else{
        return Number(prev);
    }
    
}