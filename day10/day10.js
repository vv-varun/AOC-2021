const fs = require('fs');

const fileData = fs.readFileSync(__dirname + '/input.txt', 'utf8');
const inputArray = fileData.split("\n");
//console.log(inputArray);

const bracketMap = {
    '(':')',')':'(',
    '{':'}','}':'{',
    '[':']',']':'[',
    '<':'>','>':'<'
};

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

    let corruptedElements = inputArray.map(line => {
        return _analyzeSyntax(line);
    });
    
    let sum = corruptedElements.reduce((p,c)=>{
        if(c.found){
            let points = c.found === ')'? 3: c.found === ']'? 57: c.found === '}'? 1197 : 25137;
            return p + points;
        }
        else{
            return p;
        }
    },0);

    console.log("Part 1 answer:", sum);

    console.log("________ End of Part 1 ________");
}

function part2(){

    console.log("====== Part 2 =======");

    let openSyntax = inputArray.map(line => {
        let synt = _analyzeSyntax(line);
        if(synt.index){}
        else{return synt.stack;};
    });

    openSyntax = openSyntax.filter(s=>{return s?true:false});
    //console.log("Open Sytax",openSyntax);
    
    let closeSyntax = openSyntax.map(s=>{
        let cs = s.map(s1=>{return bracketMap[s1]});
        return cs.reverse();
    });
    //console.log("Close Sytax: ",closeSyntax);

    let sums = closeSyntax.map(s=>{
        return s.reduce((p,c)=>{
            let points = c === ')'? 1: c === ']'? 2: c === '}'? 3 : 4;
            return p*5 + points;
        },0);
    });

    sums.sort((a,b)=>{return a-b});
    let midSum = sums[Math.floor(sums.length / 2)];
    console.log("Part 2", midSum);
    
    console.log("________ End of Part 2 ________");
}

function _analyzeSyntax(line){

    let openStack = [];
    let corruptElement = undefined;
    let lastBracket = '';

    for (let index = 0; index < line.length; index++) {
        const bracket = line[index];

        if(['(','{','[','<'].includes(bracket)){
            // Open bracket
            openStack.push(bracket);
        }
        else{
            // Close bracket.
            if(bracketMap[bracket] === lastBracket){
                openStack.pop();
            }
            else{
                corruptElement = {index: index, expected: bracketMap[lastBracket], found: bracket};
            }
        }

        lastBracket = openStack[openStack.length - 1];

        if(corruptElement){
            break;
        }
    }

    return corruptElement? corruptElement: {stack: openStack};
}