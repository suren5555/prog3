var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
 
 matrix = []; // Մատրիցի ստեղծում
var rows = 50; // Տողերի քանակ
var columns = 50; // Սյուների քանակ

for (var y = 0; y < rows; y++) {
matrix[y] = []; // Մատրիցի նոր տողի ստեղծում
for (var x = 0; x < columns; x++) {
var a = Math.floor(Math.random()*100);
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
console.log(matrix)

}

 grassArr = [];
  grasseaterArr = [];
  gishoArr = [];
  vzgoArr = [];
  gazanArr = [];

	Grass = require("./Grass")
	GrassEater = require("./GrassEater")
	Gisho = require("./Gisho")
	Vzgo = require("./Vzgo")
	Gazan = require("./Gazan")

function createObjects(matrix){
	for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if(matrix[y][x]==1){
                var grass = new Grass(x,y);
                grassArr.push(grass)
            }
            else if(matrix[y][x]==2){
                var eatgrass = new GrassEater(x,y)
                grasseaterArr.push(eatgrass);
            }
            else if(matrix[y][x]==3){
                var gisho = new Gisho(x,y)
                gishoArr.push(gisho);
            }
            else if(matrix[y][x]==4){
                var vz = new Vzgo(x,y)
                vzgoArr.push(vz);
            }
            else if(matrix[y][x]==5){
                var gazan = new Gazan(x,y)
                gazanArr.push(gazan);
            }
        } 
        
    }
}
function game() {
	for (var i in grassArr) {
        grassArr[i].mul()
    }
    for (var i in grasseaterArr){
        grasseaterArr[i].eat()
    }
    for (var i in gishoArr){
        gishoArr[i].eat()
    }
    for (var i in vzgoArr){
        vzgoArr[i].eat()
    }
    for (var p in gazanArr){
        gazanArr[p].eat();
    }
    let sendData = {
        matrix: matrix
    }
    console.log(matrix)
    io.sockets.emit("data", sendData);
}
setInterval(game, 1000)

io.on('connection', function (socket) {
    createObjects(matrix)

    socket.on('lightningEvent', function () {
		console.log('lightning event');
		// ավելացնել լոգիկան թե մատրիցայում ինչ է տեղի ունենում կայծակի ժամանակ
	});
})