const fs = require('fs');

const fileData = fs.readFileSync('./inputFiles/day3.txt', 'utf8');
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

    let gamma = '';
    let elipson = '';

    for (let index = 0; index < 12; index++) {

        let mainBitAtIndex = _getMainBitAtIndex(inputArray,index);

        gamma = gamma + mainBitAtIndex;
        elipson = elipson + (mainBitAtIndex === '1'? '0': '1');
    }

    let n1 = parseInt(gamma, 2);
    let n2 = parseInt(elipson,2);
    console.log("N1", n1); console.log("N2", n2);
    console.log("Product: ", n1 * n2);

    console.log("________ End of Part 1 ________");
}

function part2(){

    console.log("====== Part 2 =======");

    let newArray = inputArray.slice();
    let itemsRemaining = newArray.length;
    let counter = 0;

    do {
        
        let bitAtIndex = _getMainBitAtIndex(newArray, counter);
        //console.log(`Length of array ${itemsRemaining}`);
        //console.log(`Main bit at index ${counter} is ${bitAtIndex}`);

        filteredList = newArray.filter((v)=> {
            if(v.charAt(counter) === bitAtIndex){return v};
        });

        newArray = filteredList;
        itemsRemaining = newArray.length;
        counter = counter + 1;

    } while (itemsRemaining > 1);

    let n1 = parseInt(newArray[0], 2);

    newArray = inputArray.slice();
    itemsRemaining = newArray.length;
    counter = 0;

    do {
        
        let bitAtIndex = _getMainBitAtIndex(newArray, counter);
        bitAtIndex = bitAtIndex === '1'? '0': '1'; // Inverse the main bit

        filteredList = newArray.filter((v)=> {
            if(v.charAt(counter) === bitAtIndex){return v};
        });

        newArray = filteredList;
        itemsRemaining = newArray.length;
        counter = counter + 1;

    } while (itemsRemaining > 1);

    let n2 = parseInt(newArray[0], 2);
    console.log("N1", n1); console.log("N2", n2);
    console.log("Product: ", n1 * n2);

    console.log("________ End of Part 2 ________");
}

function _getMainBitAtIndex(array, index){

    countOfIndex = array.reduce((prev,current)=>{
        if(current.charAt(index) === '1'){
            return prev + 1;
        }
        else{
            return prev;
        }
    },0);

    if(countOfIndex * 2 >= array.length){
        return '1';
    }
    else{
        return '0';
    }
}