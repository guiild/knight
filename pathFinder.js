class PathFinder {
    board = []
    knightMoves = new Map()
    graph = new Map()

    constructor() {
        this.buildBoard()

        this.knightMoves.set("up right", {y: -2, x: 1})
        this.knightMoves.set("up left", {y: -2, x: -1})
        this.knightMoves.set("right up", {x: 2, y: -1})
        this.knightMoves.set("right down", {x: 2, y: 1})
        this.knightMoves.set("bottom right", {y: 2, x: 1})
        this.knightMoves.set("bottom left", {y: 2, x: -1})
        this.knightMoves.set("left up", {x: -2, y: -1})
        this.knightMoves.set("left bottom", {x: -2, y: 1})
    }

    getMinimumMoves = (position = 1, target = 1) => {
        const queue = [{cell: position, moves: 0}];
        const visited = new Set();


        while (queue.length) {
            const {cell, moves} = queue.shift();
            visited.add(cell);

            this.doMove(cell)


            if (cell === target) {
                return moves;
            }

            const {rowIndex, cellIndex} = this.getRowAndCellIndexes(cell)

            this.knightMoves.forEach(({x, y}) => {
                const targetCell = this.board[y + rowIndex]?.[x + cellIndex];

                if (targetCell && !visited.has(targetCell)) {
                    queue.push({cell: targetCell, moves: moves + 1});
                    visited.add(targetCell);
                }
            });
        }

        return 0;
    }

    doMove = (fromCellPosition) => {
        const {rowIndex, cellIndex} = this.getRowAndCellIndexes(fromCellPosition)

        let cells = new Set()

        this.knightMoves.forEach(({x, y}) => {
            const target = this.board[y + rowIndex]?.[x + cellIndex];
            if (target && !this.graph.has(target)) {
                cells.add(target)
            }
        });

        cells.size && this.graph.set(fromCellPosition, cells)

        cells.forEach(cell => {
            this.doMove(cell)
        })
    }

    buildBoard = (size = 8) => {
        const flatBoard = Array.from({length: size ** 2}, (_, index) => index + 1)

        this.board = Array.from({length: size}, this.chunkBoardIntoRows(flatBoard, size));
    }

    chunkBoardIntoRows = (flatBoard, boardSize) => {
        return (_, rowIndex) => {
            const rowStart = rowIndex * boardSize;
            const rowEnd = rowStart + boardSize;

            return flatBoard.slice(rowStart, rowEnd);
        };
    }

    getRowAndCellIndexes = (target) => {
        const rowIndex = this.board.findIndex((row) => row.includes(target));
        const cellIndex = this.board[rowIndex].indexOf(target);
        return {rowIndex, cellIndex};
    }
}

module.exports = PathFinder;