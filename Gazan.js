let LivingCreature = require('./LivingCreature')
var random = require('./random')

module.exports = class Gazan extends LivingCreature{
    constructor(x, y) {
        super(x,y)
        this.multiply = 25;
        this.energy = 20;
    }
    newDirections() {
        this.directions = [
            [this.x - 5, this.y - 5],
            [this.x, this.y - 5],
            [this.x + 5, this.y - 5],
            [this.x - 5, this.y],
            [this.x + 5, this.y],
            [this.x - 5, this.y + 5],
            [this.x, this.y + 5],
            [this.x + 5, this.y + 5],
            [this.x - 4, this.y - 4],
            [this.x, this.y - 4],
            [this.x + 4, this.y - 4],
            [this.x - 4, this.y],
            [this.x + 4, this.y],
            [this.x - 4, this.y + 4],
            [this.x, this.y + 4],
            [this.x + 4, this.y + 4],
            [this.x - 3, this.y - 3],
            [this.x, this.y - 3],
            [this.x + 3, this.y - 3],
            [this.x - 3, this.y],
            [this.x + 3, this.y],
            [this.x - 3, this.y + 3],
            [this.x, this.y + 3],
            [this.x + 3, this.y + 3],
            [this.x - 2, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 2, this.y + 2],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    getDirections(t) {
        this.newDirections();
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        this.energy--;
        let foundCords0 = this.getDirections(0);
        let foundCords1 = this.getDirections(1);
        let foundCords2 = this.getDirections(2);
        let foundCords3 = this.getDirections(3);
        let foundCords4 = this.getDirections(4);
        let foundCords = foundCords0.concat(foundCords1, foundCords2, foundCords3, foundCords4)
        let cord = random(foundCords);
        if (cord) {
            let x = cord[0];
            let y = cord[1];
            matrix[y][x] = 5;
            for (let i in gishoArr) {
                if (this.x == gishoArr[i].x && this.y == gishoArr[i].y) {
                    gishoArr.splice(i, 1);
                }
            }
            for (let i in vzgoArr) {
                if (this.x == vzgoArr[i].x && this.y == vzgoArr[i].y) {
                    vzgoArr.splice(i, 1);
                }
            }
            for (let i in grasseaterArr) {
                if (this.x == grasseaterArr[i].x && this.y == grasseaterArr[i].y) {
                    grasseaterArr.splice(i, 1);
                }
            }
            for (let i in grassArr) {
                if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                }
            }
            matrix[this.y][this.x] = 1;
            let norgraz = new Grass(this.x, this.y);
            grassArr.push(norgraz);
            this.multiply = 0;
            this.x = x;
            this.y = y;
        }
    }
    // mul() {
    //     let foundCords0 = this.getDirections(0);
    //     let foundCords1 = this.getDirections(1);
    //     let foundCords2 = this.getDirections(2);
    //     let foundCords3 = this.getDirections(3);
    //     let foundCords4 = this.getDirections(4);
    //     let fundCords = foundCords0.concat(foundCords1, foundCords2, foundCords3, foundCords4)
    //     let cord = random(fundCords);

    //     if (cord) {
    //         let x = cord[0];
    //         let y = cord[1];

    //         this.multiply++;

    //         let norgazan = new Gazan(x, y);
    //         gazanArr.push(norgazan);

    //         matrix[y][x] = 5;
    //         this.multiply = 0;

    //         for (let i in gazanArr) {
    //             if (this.x == gazanArr[i].x && this.y == gazanArr[i].y) {
    //                 gazanArr.splice(i, 1);
    //             }
    //         }
    //     }
    // }
    die() {
        console.log("die");
        matrix[this.y][this.x] = 0;
        // let norgraz = new Grass(this.x, this.y);
        // grassArr.push(norgraz);
        for (let i in gazanArr) {
            if (this.x == gazanArr[i].x && this.y == gazanArr[i].y) {
                gazanArr.splice(i, 1);
            }
        }

    }
    eat() {
        if (this.energy <= 0) {
            this.die();
        }
        else {
            let foundCords2 = this.getDirections(2);
            let foundCords3 = this.getDirections(3);
            let foundCords4 = this.getDirections(4);
            let fundCords = foundCords2.concat(foundCords3, foundCords4)
            let cord = random(fundCords);
            if (cord) {
                var x = cord[0];
                var y = cord[1];
    
                matrix[y][x] = 5;
                // let norgraz = new Grass(this.x, this.y);
                // grassArr.push(norgraz);
                matrix[this.y][this.x] = 0;
    
    
                this.x = x;
                this.y = y;
    
                this.multiply++;
                this.energy++;
                for (let i in vzgoArr) {
                    if (x == vzgoArr[i].x && y == vzgoArr[i].y) {
                        vzgoArr.splice(i, 1);
                    }
                }
                for (let i in grasseaterArr) {
                    if (x == grasseaterArr[i].x && y == grasseaterArr[i].y) {
                        grasseaterArr.splice(i, 1);
                    }
                }
                for (let i in gishoArr) {
                    if (x == gishoArr[i].x && y == gishoArr[i].y) {
                        gishoArr.splice(i, 1);
                    }
                }
    
    
                // if (this.multiply == 10000) {
                //     this.mul()
                //     this.multiply = 0;
                // }
            }
            else {
                this.move();
                this.energy--;
    
            }
        }
       
    }
}       