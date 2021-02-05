let LivingCreature = require('./LivingCreature')
var random = require('./random')

module.exports = class Gisho extends LivingCreature{
    constructor(x, y) {
        super(x,y)
        this.energy = 50;
    }
    newDirections() {
        this.directions = [
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
        let foundcords1 = this.getDirections(0);
        let foundcords2 = this.getDirections(1);
        let foundcords = foundcords1.concat(foundcords2)
        let cord = random(foundcords);
        if (cord) {
            let x = cord[0];
            let y = cord[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
        }
    }
    mul() {
        let fundCords = this.getDirections(0);
        let cord = random(fundCords);

        if (cord) {
            let x = cord[0];
            let y = cord[1];

            this.multiply++;

            let norgishatich = new Gisho(x, y);
            gishoArr.push(norgishatich);

            matrix[y][x] = 3;
            this.multiply = 0;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (let i in gishoArr) {
            if (this.x == gishoArr[i].x && this.y == gishoArr[i].y) {
                gishoArr.splice(i, 1);
            }
        }
    }
    eat() {
        let fundCords = this.getDirections(2);
        let cord = random(fundCords);
        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            this.multiply++;

            this.energy++;
            for (let i in gishoArr) {
                if (x == gishoArr[i].x && y == gishoArr[i].y) {
                    gishoArr.splice(i, 1);
                }
            }

            if (this.multiply == 10) {
                this.mul()
                this.multiply = 0;
            }


        } else {
            this.move();
            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }
        }
    }
}