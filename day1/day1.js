const fs = require('fs');

const fileData = fs.readFileSync(__dirname + '/input.txt', 'utf8');
const inputArray = fileData.split("\n");
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

    let incr = inputArray.reduce((p,c,index)=>{
        if (Number(c) > Number(inputArray[index-1])) {
            return p+1;
        }
        else{
            return p;
        }
    },0);

    console.log("Part 1", incr);
    console.log("________ End of Part 1 ________");
}

function part2(){

    console.log("====== Part 2 =======");

    let incr = inputArray.reduce((p,c,index)=>{
        if (Number(c) > Number(inputArray[index-3])) {
            return p+1;
        }
        else{
            return p;
        }
    },0);

    console.log("Part 2:", incr);
    
    console.log("________ End of Part 2 ________");
}