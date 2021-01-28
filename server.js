let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);
let fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
 
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
 
io.sockets.emit('send matrix', matrix)

let grassArr = [];
 let grasseaterArr = [];
 let gishoArr = [];
 let vzgoArr = [];
 let gazanArr = [];

	Grass = require("./Grass")
	GrassEater = require("./GrassEater")
	Gisho = require("./Gisho")
	Vzgo = require("./Vzgo")
	Gazan = require("./Gazan")

function createObjects(matrix){
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
        io.sockets.emit('send matrix', matrix)  
    }
}
function game() {
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
    io.sockets.emit("send matrix", matrix);
}
setInterval(game, 1000)

io.on('connection', function (socket) {
    createObject(matrix)
})