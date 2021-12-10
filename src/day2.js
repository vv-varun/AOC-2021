const fs = require('fs');

const fileData = fs.readFileSync('./inputFiles/day2.txt', 'utf8');
const inputArray = fileData.split("\n");

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

    let x = 0; let y = 0;

    inputArray.forEach(c => {
    
    let spl = c.split(" ");
    if(spl[0] === 'forward'){
        x = x + 0 + Number(spl[1]);
    }

    if(spl[0] === 'down'){
        y = y + 0 + Number(spl[1]);
    }

    if(spl[0] === 'up'){
        y = y + 0 - Number(spl[1]);
    }

    });

    console.log("X", x);
    console.log("Y", y);
    console.log("Product", x*y);
    console.log("________ End of Part 1 ________");
}

function part2(){

    console.log("====== Part 2 =======");
    let x = 0; let y = 0; let a = 0;

    inputArray.forEach(c => {
    
    let spl = c.split(" ");
    if(spl[0] === 'forward'){
        x = x + 0 + Number(spl[1]);
        y = y + a * Number(spl[1]);
    }

    if(spl[0] === 'down'){
        y = y + 0 + Number(spl[1]);
        a = a + 0 + Number(spl[1]);
    }

    if(spl[0] === 'up'){
        y = y + 0 - Number(spl[1]);
        a = a + 0 - Number(spl[1]);
    }

    });

    console.log("X", x);
    console.log("Y", y);
    console.log("A", a);
    console.log("Product", x*y);

    console.log("________ End of Part 2 ________");
}