class PathFinder {
    board = []
    knightMoves = [[2, 1], [2, -1], [-2, 1], [-2, -1]]
    knightPosition = [0, 0]
    knightTarget = [0, 0]

    constructor() {
        this.buildBoard()
    }

    getMinimumMoves = (position = 1, target = 1) => {
        this.setKnightPosition(position)
        this.setKnightTarget(target)
        return 0
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

    setKnightPosition = (position) => {
        const {rowIndex, cellIndex} = this.getRowAndCellIndexes(position);

        this.knightPosition = [rowIndex, cellIndex];
    }

    setKnightTarget = (target) => {
        const {rowIndex, cellIndex} = this.getRowAndCellIndexes(target);

        this.knightTarget = [rowIndex, cellIndex]
    }


}

module.exports = PathFinder; 