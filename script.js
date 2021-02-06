var side = 20;
var socket = io();
socket.on("data", draw)
var n = 50
var m = 50
var matrix = []

function setup() {

    frameRate(1);
    createCanvas(n * side, m * side);
    background('#acacac');
}
function draw(data) {
    
    matrix = data.matrix;
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            var obj = matrix[x][y];
            if (obj == 1) {
                fill("green")
                rect(x*side, y*side,side,side)
            }
            else if (obj == 0) {
                fill("#acacac")
                rect(x*side, y*side,side,side)
            }
            else if (obj == 2) {
                fill("yellow")
                rect(x*side, y*side,side,side)
            }
            else if (obj == 3) {
                fill("red")
                rect(x*side, y*side,side,side)
            }
            else if (obj == 4) {
                fill("black")
                rect(x*side, y*side,side,side)
            }
            else if (obj == 5) {
                fill("pink")
                rect(x*side, y*side,side,side)
            }
            
        }
    }
}

function lightningEvent() {
    socket.emit('lightningEvent');
} 
function someEvent() {
    // Ասել socket-ին որ տեղի ունեցավ someEvent իրադարձությունը
    socket.emit('someEvent');
}  