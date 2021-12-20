const fs = require('fs');

const fileData = fs.readFileSync(__dirname + '/input.txt', 'utf8');
const inputArray = fileData.split("\n");
const startPolymer = inputArray[0];
const substitutions = {};
inputArray.forEach(line=>{
    if(line.indexOf('->') > 0){
        substitutions[line.substring(0,2)] = line.substring(6);
    }
});

//console.log("Substitutions:", substitutions);

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

    let polymer = startPolymer;
    let counter = 0;

    do {
        
        let newPolymer = '';
        for (let index = 0; index < polymer.length-1; index++) {
            
            let rule = polymer[index] + polymer[index + 1];
            let substitute = substitutions[rule];
            if(substitute){
                if(newPolymer === ''){newPolymer =  newPolymer + polymer[index] + substitute + polymer[index + 1];}
                else{newPolymer =  newPolymer + substitute + polymer[index + 1];}
            }
            else{
                console.log(`No substitution found for rule: ${rule}`);
            }
        }
        polymer = newPolymer;
        counter++;

    } while (counter < 10);

    let counts = _countPolymer(polymer);
    counts = Object.keys(counts).map((key) => {return {key: key, count:counts[key]}});
    counts.sort((a,b)=>{return b.count - a.count});
    console.log("Counts:", counts);

    let max = counts[0];
    let min = counts[counts.length - 1];

    console.log("Part 1: ", (max.count - min.count));

    console.log("________ End of Part 1 ________");
}

function part2(){

    console.log("====== Part 2 =======");

    let pairCounts = newPairCounts = _countPairs(startPolymer);
    let counter = 0;

    do {

        for (const [key, value] of Object.entries(pairCounts)) {
            
            let substitute = substitutions[key];
            let pair1 = key[0] + substitute;
            let pair2 = substitute + key[1];

            newPairCounts[pair1] = newPairCounts[pair1]? newPairCounts[pair1]+value : value;
            newPairCounts[pair2] = newPairCounts[pair2]? newPairCounts[pair2]+value : value;
            newPairCounts[key] = newPairCounts[key] - value;
            if(newPairCounts[key] < 1){
                delete newPairCounts[key];
            }

        }
        pairCounts = newPairCounts;
        counter++;

        //console.log(`After step ${counter} pair counts:`, newPairCounts);
        //let ps = Object.keys(newPairCounts).reduce((p,c)=>{return p+newPairCounts[c]},0); console.log(`After step ${counter} total polymer length:`, ps);
        

    } while (counter < 40);

    //console.log("Pair Counts:",pairCounts);

    let counts = {};
    Object.keys(pairCounts).forEach((key)=>{

        let value = pairCounts[key];
        
        let element = key[0];
        counts[element] = counts[element]? counts[element]+value : value;
        
        element = key[1];
        counts[element] = counts[element]? counts[element]+value : value;
        
        //let c= Object.keys(counts).map((key) => {return {key: key, count:counts[key]}}); console.log(`checking for ${key}`, c);
    });
    
    counts = Object.keys(counts).map((key) => {return {key: key, count:Math.ceil(counts[key]/2)}});
    counts.sort((a,b)=>{return b.count - a.count});
    console.log("Counts:", counts);

    let max = counts[0];
    let min = counts[counts.length - 1];

    console.log("Part 2: ", (max.count - min.count));
    
    console.log("________ End of Part 2 ________");
}

function _countPolymer(polymer){

    let counts = {};
    for (let index = 0; index < polymer.length; index++) {
        const element = polymer[index];
        counts[element] = counts[element]? counts[element]+1 : 1;
    }

    //console.log(counts);
    return counts;
}

function _countPairs(polymer){

    let counts = {};
    for (let index = 0; index < polymer.length-1; index++) {
        pair = polymer[index] + polymer[index + 1];
        counts[pair] = counts[pair]? counts[pair]+1 : 1;
    }

    //console.log("Polymer pair counts", counts);
    return counts;
}