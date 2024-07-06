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
        this.doMove(position)

        const values = [...this.graph.values()]

        const [forwardPath] = values.map((v, index) => v.has(target) ? index + 1 : 0).filter((v) => v)
        const [reversedPath] = values.reverse().map((v, index) => v.has(target) ? index + 1 : 0).filter((v) => v)

        return Math.min(forwardPath || 0, reversedPath || 0)
    }

    doMove = (fromCellPosition) => {
        const {rowIndex, cellIndex} = this.getRowAndCellIndexes(fromCellPosition)

        let cells = new Set()

        this.knightMoves.forEach(({x, y}, index) => {
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
        const rowIndex = this.board.findIndex((row, index) => row.includes(target));
        const cellIndex = this.board[rowIndex].indexOf(target);
        return {rowIndex, cellIndex};
    }


}


module.exports = PathFinder;
