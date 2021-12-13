const fs = require('fs');
const path = require('path');

const fileData = fs.readFileSync(__dirname + '/input.txt', 'utf8');
const inputArray = fileData.split("\n");

const paper = inputArray.filter(l=>{
    return l.indexOf(',') > 0? true: false;
}).map(p=>{
    let xy = p.split(',');
    return {x:Number(xy[0]),y:Number(xy[1])}
});

const folds = inputArray.filter(l=>{
    return l.substring(0,10) === 'fold along';
}).map(f=>{
    let sp = f.substring(11).split('=');
    let fi = {};
    fi[sp[0]] = Number(sp[1]);
    return fi;
});

const maxPaperSize = _getPaperSize(paper);

//console.log("Paper", paper, paper.length);
//console.log("Fold Instructions", folds);
//console.log("Paper size", maxPaperSize);

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

    let fold1 = folds[0];
    let foldedPaper = paper;

    console.log("Folding at:", fold1);
    if(fold1.x){
        foldedPaper = foldAlongX(foldedPaper, fold1.x);
    }
    if(fold1.y){
        foldedPaper = foldAlongY(foldedPaper, fold1.y);
    }

    //console.log("Original paper",paper);
    //console.log("Folded paper",foldedPaper);
    console.log("Dots on paper:", foldedPaper.length);

    console.log("________ End of Part 1 ________");
}

function part2(){

    console.log("====== Part 2 =======");

    let foldedPaper = paper;

    folds.forEach(fold => {

        //console.log("Folding at:", fold);
        if(fold.x){
            foldedPaper = foldAlongX(foldedPaper, fold.x);
        }
        if(fold.y){
            foldedPaper = foldAlongY(foldedPaper, fold.y);
        }
        
    });

    //console.log("Folded paper",foldedPaper);

    let paperSize = _getPaperSize(foldedPaper);
    //console.log("Folded paper size", paperSize);

    let visualPaper = [];

    for (let y = 0; y <= paperSize.y; y++) {
        let paperLine = [];
        for (let x = 0; x <= paperSize.x; x++) {
            paperLine.push(' ');
        }
        visualPaper.push(paperLine);
    }

    foldedPaper.forEach(line => {
        visualPaper[line.y][line.x] = '█';
    });

    console.log("Visual Paper"); _printPaper(visualPaper);
    
    console.log("________ End of Part 2 ________");
}

function foldAlongX(paper, x){
    // When a paper is folded along X.. the right part folds to left side.
    // Y points dont change... but X points change.
    let foldedPaper = paper.map(point=>{

        if(point.x < x){return point};  // Left part of paper.. remains as it is..
        let newX = x - (point.x - x);
        return {x: newX, y: point.y};
    });

    return _removeOverlappingPoints(foldedPaper);
}

function foldAlongY(paper, y){
    // When a paper is folded along Y.. the lower part folds up.
    // X points dont change... byt Y points change.
    let foldedPaper = paper.map(point=>{

        if(point.y < y){return point};  // Upper part of paper.. remains as it is..
        let newY = y - (point.y - y);
        return {x: point.x, y: newY};
    });

    return _removeOverlappingPoints(foldedPaper);
}

function _getPaperSize(paper){

    let size = paper.reduce((p,c)=>{

        p.x = c.x >= p.x ? c.x : p.x;
        p.y = c.y >= p.y ? c.y : p.y;
        return p;
    },{x:0,y:0});

    return size;
}

function _removeOverlappingPoints(paper){
    // Search for overlapping points and keep only 1
    let newPaper = [];

    paper.forEach(point => {

        let found = newPaper.filter(p=>{
            return p.x === point.x && p.y === point.y;
        });

        if(found.length > 0){}
        else{
            newPaper.push(point);
        }

    });

    return newPaper;
    
}

function _printPaper(paper){
    paper.forEach(line=>{
        console.log(line.join(''));
    });
}