var LivingCreature = require('./LivingCreature')

module.exports = class Grass extends LivingCreature{
    constructor(x, y,index,multiply) {
        super(x,y,index,multiply);
    }
    mul() {
        this.multiply++;
        if (this.multiply >= 5) {
            var emptyCells = super.chooseCell(0)
            var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
            if (this.multiply >= 5 && newCell) {
                var x = newCell[0]
                var y = newCell[1]
                var gr = new Grass(x, y, 1)
                grassArr.push(gr)
                this.multiply = 1;
            }
        }
    }
} 