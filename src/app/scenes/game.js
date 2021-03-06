import { Block } from '../entities/block.js';
import { TimeBar } from '../entities/time-bar.js';

export class Game {
    
    TOTAL_ROWS = 10;
    TOTAL_COLUMNS = 6;

    MEDIUM_MATCHES = 23;

    MAX_BLOCK_SELECTED = 3;

    FIRST = 0;
    SECOND = 1;
    THIRD = 2;

    constructor(p5) {
        this.p5 = p5;
        this.panelImage;
        this.blockImage;
        this.blocks = this.fillGame(this.TOTAL_COLUMNS, this.TOTAL_ROWS);
        this.finalScore = 0;
        this.score = 0;
        this.timeBar = this.createTimeBar();
        this.selected = [];
        this.availableMatches = this.getAvailableMatches();
    }

    preload() {
        this.panelImage = this.p5.loadImage('./src/app/assets/panel.png');
        this.blockImage = this.p5.loadImage('./src/app/assets/numbers2.png');
    }

    pressed() {
        const blockClicked = this.blocks.find ( block => 
                this.p5.mouseX > block.x
                && this.p5.mouseX < block.x + block.width
                && this.p5.mouseY > block.y
                && this.p5.mouseY < block.y + block.height);

        if (!!blockClicked) {
            blockClicked.selected = true;
            this.selected.push(blockClicked)
        }

    }       
    
    dragged() {
        const blockClicked = this.blocks.find ( block => 
            this.p5.mouseX > block.x
            && this.p5.mouseX < block.x + block.width
            && this.p5.mouseY > block.y
            && this.p5.mouseY < block.y + block.height);

        if (!!blockClicked && this.selected.length === 0) {
            blockClicked.selected = true;
            this.selected.push(blockClicked);
        } else if (
            !!blockClicked && 
            this.selected.length !== 0 &&
            !this.selected.includes(blockClicked) && 
                ((this.selected[this.selected.length - 1].row - 1 === blockClicked.row && this.selected[this.selected.length - 1].column === blockClicked.column) ||
                 (this.selected[this.selected.length - 1].row + 1 === blockClicked.row && this.selected[this.selected.length - 1].column === blockClicked.column) ||
                 (this.selected[this.selected.length - 1].row === blockClicked.row && this.selected[this.selected.length - 1].column - 1 === blockClicked.column) ||
                 (this.selected[this.selected.length - 1].row === blockClicked.row && this.selected[this.selected.length - 1].column + 1 === blockClicked.column))) {
            
            blockClicked.selected = true;
            this.selected.push(blockClicked);
        }
    }

    released() {
        if (this.selected.length === this.MAX_BLOCK_SELECTED) {
            
            if (this.selected[this.FIRST].value + this.selected[this.SECOND].value === this.selected[this.THIRD].value) {

                this.score += Number.parseInt(this.selected[this.THIRD].value * this.MEDIUM_MATCHES / this.availableMatches);

                this.timeBar.time = this.timeBar.INITIAL_TIME;

                // It removes all three selected blocks from the total blocks array
                this.selected.forEach( block => {
                    const row = block.row;
                    const column = block.column;
                    const selectedBlock = this.blocks.find(block => block.row == row && block.column == column);
                    const index = this.blocks.indexOf(selectedBlock);
                    this.blocks.splice(index, 1);
                });

                // It stores the columns of the blocks removed on the last step
                const columns = [];
                this.selected.forEach( block => columns.push(block.column));

                // It stores the columns stored in the last step but removing the columns repeated.
                // The idea behind this step is to know how many columns have been affected by blocks removed.
                const uniqueColumns = [...new Set(columns)];

                // get the blocks above the upper block 
                // With this instruction, ...
                uniqueColumns.sort( (a, b) => a - b )
                                // we get every column on the last step ...
                                .forEach (column => {
                                // and get the number of blocks that remain in that column ...
                                const blocksInColumn = this.blocks.filter(block => block.column === column).length;
                                // this way we can calculate how many blocks we have to create in that column.
                                const numberOfBlocksToCreate = this.TOTAL_ROWS - blocksInColumn;
                                // Then, we calculate in the removed blocks array what blocks belong to this column
                                const lowestRow = this.selected.filter( block => block.column === column )
                                                                // get the row of these blocks
                                                                .map( block => block.row )
                                                                // and get the lowest one.
                                                                // This way, we can get the uppest removed block in
                                                                // every column.
                                                                .sort( (b1, b2 ) => b1 - b2)[0];
                                // All the blocks above the uppest removed block in the column must fall to fill 
                                // the gusp left by them
                                this.blocks.filter ( block => block.column == column && block.row < lowestRow )
                                            .forEach ( block => {
                                                block.isStopped = false;
                                                block.row += numberOfBlocksToCreate ;
                                            });
                                // Finally, depending on the number of blocks removed from a column, we add that number
                                // of blocks to the same column to fill it again.
                                const newBlocks = new Array(numberOfBlocksToCreate);
                                newBlocks.fill(0);
                                newBlocks.forEach( (value, index) => this.blocks.push(this.createBlock(column, index)));

                });
            }

            if (!this.isAnyMatchLeft()) {
                this.blocks = this.fillGame(this.TOTAL_COLUMNS, this.TOTAL_ROWS);
                this.score += 1000;
            }
        }

        this.selected.forEach (block => block.selected = false);
        this.selected = [];
    }

    draw() {
        this.p5.background(220);
        this.blocks.forEach( block => {
            block.update();
            block.draw();
        })
        this.p5.image(this.panelImage, 0, 0, this.width, this.height);
        this.p5.fill(255);
        this.p5.noStroke();
        this.p5.textSize(50);
        this.p5.textAlign(this.p5.LEFT);
        this.p5.text('Score: ', 10, 50);
        this.p5.textAlign(this.p5.RIGHT);
        this.p5.text(this.score, 402, 50);
        this.timeBar.update();
        this.timeBar.draw();
    }

    fillGame(totalColumns, totalRows) {

        const result = [];

        for (let i = 0; i < totalColumns; i++) {
            for (let j = 0; j < totalRows; j++) {
                result.push(this.createBlock(i, j));
            }
        }

        return result;
    }
    
    createBlock(column, row) {
        return new Block(this, column, row);
    }
    
    getAvailableMatches() {

        let availableMatches = 0;

        this.blocks.forEach (block => {

            let first = block.value;
            let second = 0;
            let result = 0;

            //   |
            //   |
            //   o
            if (block.row > 1) {
                second = this.blocks.find( secondBlock => secondBlock.column === block.column && secondBlock.row === block.row - 1).value;
                result = this.blocks.find( resultBlock => resultBlock.column === block.column && resultBlock.row === block.row - 2).value;
                availableMatches += this.checkSum(first, second, result);
            }
            
            //  _  
            //   |
            //   o
            //
            // |
            //  -o
            if (block.row > 0 && block.column > 0) {
                second = this.blocks.find( secondBlock => secondBlock.column === block.column && secondBlock.row === block.row - 1).value;
                result = this.blocks.find( resultBlock => resultBlock.column === block.column - 1 && resultBlock.row === block.row - 1).value;
                availableMatches += this.checkSum(first, second, result);
                second = this.blocks.find( secondBlock => secondBlock.column === block.column - 1 && secondBlock.row === block.row).value;
                result = this.blocks.find( resultBlock => resultBlock.column === block.column - 1 && resultBlock.row === block.row - 1).value;
                availableMatches += this.checkSum(first, second, result);
            }

            // 
            //  --o
            //
            if (block.column > 1) {
                second = this.blocks.find( secondBlock => secondBlock.column === block.column - 1 && secondBlock.row === block.row).value;
                result = this.blocks.find( resultBlock => resultBlock.column === block.column - 2 && resultBlock.row === block.row).value;
                availableMatches += this.checkSum(first, second, result);
            }

            //
            //   -o
            //  |
            //  
            //    o
            //   _|
            if (block.column > 0 && block.row < this.TOTAL_ROWS - 1) {
                second = this.blocks.find( secondBlock => secondBlock.column === block.column - 1 && secondBlock.row === block.row).value;
                result = this.blocks.find( resultBlock => resultBlock.column === block.column - 1 && resultBlock.row === block.row + 1).value;
                availableMatches += this.checkSum(first, second, result);
                second = this.blocks.find( secondBlock => secondBlock.column === block.column && secondBlock.row === block.row + 1).value;
                result = this.blocks.find( resultBlock => resultBlock.column === block.column - 1 && resultBlock.row === block.row + 1).value;
                availableMatches += this.checkSum(first, second, result);
            }

            //    o 
            //    |
            //    |
            if (block.row < this.TOTAL_ROWS - 2) {
                second = this.blocks.find( secondBlock => secondBlock.column === block.column && secondBlock.row === block.row + 1).value;
                result = this.blocks.find( resultBlock => resultBlock.column === block.column && resultBlock.row === block.row + 2).value;
                availableMatches += this.checkSum(first, second, result);
            }

            // 
            //    o
            //    |_
            // 
            //    o-
            //      |
            if (block.column < this.TOTAL_COLUMNS - 1 && block.row < this.TOTAL_ROWS - 1) {
                second = this.blocks.find( secondBlock => secondBlock.column === block.column && secondBlock.row === block.row + 1).value;
                result = this.blocks.find( resultBlock => resultBlock.column === block.column + 1 && resultBlock.row === block.row + 1).value;
                availableMatches += this.checkSum(first, second, result);
                second = this.blocks.find( secondBlock => secondBlock.column === block.column + 1 && secondBlock.row === block.row).value;
                result = this.blocks.find( resultBlock => resultBlock.column === block.column + 1 && resultBlock.row === block.row + 1).value;
                availableMatches += this.checkSum(first, second, result);
            }

            // 
            //    o--
            //
            if (block.column < this.TOTAL_COLUMNS - 2) {
                second = this.blocks.find( secondBlock => secondBlock.column === block.column + 1 && secondBlock.row === block.row).value;
                result = this.blocks.find( resultBlock => resultBlock.column === block.column + 2 && resultBlock.row === block.row).value;
                availableMatches += this.checkSum(first, second, result);
            }

            //      |
            //    o-
            // 
            //     _
            //    |
            //    o
            if (block.column < this.TOTAL_COLUMNS - 1 && block.row > 0) {
                second = this.blocks.find( secondBlock => secondBlock.column === block.column + 1 && secondBlock.row === block.row).value;
                result = this.blocks.find( resultBlock => resultBlock.column === block.column + 1 && resultBlock.row === block.row - 1).value;
                availableMatches += this.checkSum(first, second, result);
                second = this.blocks.find( secondBlock => secondBlock.column === block.column && secondBlock.row === block.row - 1).value;
                result = this.blocks.find( resultBlock => resultBlock.column === block.column + 1 && resultBlock.row === block.row - 1).value;
                availableMatches += this.checkSum(first, second, result);
            }
        });

        return availableMatches;

    }

    isAnyMatchLeft() {
        this.availableMatches = this.getAvailableMatches();
        return this.availableMatches > 0;
    }

    checkSum(first, second, result) {
        if (first + second === result) {
            return 1;
        }
        return 0;
    }

    createTimeBar() {
        return new TimeBar(this);
    }

}