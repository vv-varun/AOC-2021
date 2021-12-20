const fs = require('fs');

const fileData = fs.readFileSync(__dirname + '/input.txt', 'utf8');
const inputArray = fileData.split("\n");
const imgAlgo = inputArray[0];
const image = inputArray.filter((l,i)=>{
    return i>1;
});

let startTime = Date.now();
part1();
let endTime = Date.now();
console.log(`${endTime - startTime} milliseconds to complete Part 1`);

startTime = Date.now();
part2();
endTime = Date.now();
console.log(`${endTime - startTime} milliseconds to complete Part 2`);

function part1(){

    let newImage = _enhanceImage(image, 2);
    let totalLitCount = _countPixels(newImage,'#');
    console.log("Part 1 answer:", totalLitCount);
}

function part2(){

    let newImage = _enhanceImage(image, 50);
    let totalLitCount = _countPixels(newImage,'#');
    console.log("Part 2 answer:", totalLitCount);
}

function _enhanceImage(image, N){

    let counter = 0;
    
    do {

        let defPixed = counter%2 === 0? '.' : '#' ;
        let newImage = [];

        for (let x = -1; x <= image.length; x++) {
            let newLine = [];
            for (let y = -1; y <= image.length; y++) {
                let replacementPixel = _getReplacementPixel(image,x,y,defPixed);
                newLine.push(replacementPixel);
            }
            newImage.push(newLine.join(''));
        }

        image = newImage;
        counter++;

    } while (counter < N);
    
    return image;
}

function _getReplacementPixel(img,x,y,defPixel){

    let adjacentPoints = [];

    
    adjacentPoints.push({x:x-1, y:y-1});    adjacentPoints.push({x:x-1, y:y});  adjacentPoints.push({x:x-1, y:y+1});
    adjacentPoints.push({x:x, y:y-1});      adjacentPoints.push({x:x, y:y});    adjacentPoints.push({x:x, y:y+1});
    adjacentPoints.push({x:x+1, y:y-1});    adjacentPoints.push({x:x+1, y:y});  adjacentPoints.push({x:x+1, y:y+1});

    let imgPixels = adjacentPoints.map(p=>{
        if(p.x >=0 && p.x < img.length && p.y >=0 && p.y < img.length){
            //console.log("Processing pixels",p.x,p.y);
            return img[p.x][p.y];
        }
        else{
            return defPixel;
        }
    });

    let binString = imgPixels.map(p=>{return p === '.'?0:1}).join('');
    let algIndex = parseInt(binString,2);

    //console.log("Adj Points", JSON.stringify(adjacentPoints));
    //console.log("Image Pixels", imgPixels);
    //console.log("Bin String", binString);
    //console.log("Alg Index", algIndex);

    return imgAlgo[algIndex];

}

function _countPixels(img, pixel){

    let lineSums = img.map((line)=>{
        return line.split('').reduce((p,c)=>{
            return c === pixel? p+1: p;
        },0);
    });

    let sums = lineSums.reduce((p,c)=>{return p+c},0);
    return sums;
}