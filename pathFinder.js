class PathFinder {
    board = []

    constructor() {
        this.buildBoard()
    }

    getMinimumMoves = (position, target) => {
        return 0
    }

    buildBoard = (size = 8) => {
        const flatBoard = Array.from({length: size ** 2},(_, index) => index + 1)

        this.board = Array.from({length: size}, this.chunkBoardIntoRows(flatBoard, size));
    }

    chunkBoardIntoRows = (flatBoard, boardSize) => {
        return (_, rowIndex) => {
            const rowStart = rowIndex * boardSize;
            const rowEnd = rowStart + boardSize;

            return flatBoard.slice(rowStart, rowEnd);
        };
    }
}

module.exports = PathFinder;