// function genetareMatrix(lengthY, lengthX, number) {
//     let matrix = [];

//         function getRandomInt(max) {
//         return Math.floor(Math.random() * Math.floor(max));
//         }

//     for (let y = 0; y < lengthY; y++) {
//     matrix.push([]);
//     for (let x = 0; x < lengthX; x++) {
//     let randomCount = getRandomInt(number);
//     matrix[y].push(randomCount);
//     }
//     }
//     return matrix; 
//     }
    
//  let matrix = genetareMatrix(50,50,6);
let matrix = []; // Մատրիցի ստեղծում
let rows = 50; // Տողերի քանակ
let columns = 50; // Սյուների քանակ

for (let y = 0; y < rows; y++) {
matrix[y] = []; // Մատրիցի նոր տողի ստեղծում
for (let x = 0; x < columns; x++) {
let a = Math.floor(Math.random()*100);
if (a >= 0 && a < 20) {
matrix[y][x] = 0; // Մատրիցի 20 տոկոսը կլինի 0
} 
if (a >= 20 && a < 40) {
matrix[y][x] = 1; // Մատրիցի 20 տոկոսը կլինի 1
} 
else if (a >= 40 && a < 60) {
matrix[y][x] = 2; // Մատրիցի 10 տոկոսը կլինի 2
} 
else if (a >= 60 && a < 80) {
matrix[y][x] = 3; // Մատրիցի 20 տոկոսը կլինի 3
} 
else if(a >= 80 && a < 99) {
matrix[y][x] = 4; // Մատրիցի 20 տոկոսը կլինի 4
} 
else if(a >= 99 && a < 100) {
matrix[y][x] = 5; // Մատրիցի 10 տոկոսը կլինի 5
} 
}
}
 
 let side = 10;
 let grassArr = [];
 let grasseaterArr = [];
 let gishoArr = [];
 let vzgoArr = [];
 let gazanArr = [];

 function setup() {
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    
    
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if(matrix[y][x]==1){
                let grass = new Grass(x,y);
                grassArr.push(grass)
            }
            else if(matrix[y][x]==2){
                let eatgrass = new Grasseater(x,y)
                grasseaterArr.push(eatgrass);
            }
            else if(matrix[y][x]==3){
                let gisho = new Gisho(x,y)
                gishoArr.push(gisho);
            }
            else if(matrix[y][x]==4){
                let vz = new Vzgo(x,y)
                vzgoArr.push(vz);
            }
            else if(matrix[y][x]==5){
                let gazan = new Gazan(x,y)
                gazanArr.push(gazan);
            }
        }   
    }
 }
function draw() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x]== 1) {
                fill("green")
            }
            else if (matrix[y][x]== 0) {
                fill("#acacac")
            }
            else if (matrix[y][x] == 2){
                fill("yellow")
            }
            else if (matrix[y][x] == 3){
                fill("red")
            }
            else if (matrix[y][x] == 4){
                fill("black")
            }
            else if (matrix[y][x] == 5){
                fill("pink")
            }
            rect(x*side,y*side,side,side)
        }
    }
    for (let i in grassArr) {
        grassArr[i].mul()
    }
    for (let i in grasseaterArr){
        grasseaterArr[i].eat()
    }
    for (let i in gishoArr){
        gishoArr[i].eat()
    }
    for (let i in vzgoArr){
        vzgoArr[i].eat()
    }
    for (let p in gazanArr){
        gazanArr[p].eat();
    }
    console.log(gazanArr.length)
}