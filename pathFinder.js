class PathFinder {
    gridSquare= []

    constructor() {
        this.createGridSquare()
    }
    getMinimumMoves = (position, target) => {
        return 0
    }

    createGridSquare = (sideSize = 8) => {
        this.gridSquare = Array(sideSize**2)
    }
}

module.exports = PathFinder;