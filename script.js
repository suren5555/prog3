let socket = io();

let side = 10;    

 function setup() {
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
 
 function nkarel(matrix) {
    console.log(matrix);
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            let obj = matrix[x][y];
            if (obj == 1) {
                fill("green")
            }
            else if (obj == 0) {
                fill("#acacac")
            }
            else if (obj == 2){
                fill("yellow")
            }
            else if (obj == 3){
                fill("red")
            }
            else if (obj == 4){
                fill("black")
            }
            else if (obj == 5){
                fill("pink")
            }
            rect(x*side,y*side,side,side)
        }
    }
}

    setInterval(
        function () {
        socket.on('send matrix', nkarel)
        },1000
    )
}