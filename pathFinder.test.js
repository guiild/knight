const PathFinder = require('./pathFinder');
const finder = require("./pathFinder");

describe('Pathfinder', () => {
    let finder;

    beforeEach(() => {
        finder = new PathFinder();
    })

    describe('TDD', () => {
        test('should have a grid defined', () => {
            expect(finder).toHaveProperty("gridSquare");
        });

        test('should have an gridSquare', () => {
            const gridSquare = finder.gridSquare;

            expect(Array.isArray(gridSquare)).toBeTruthy();
        });

        test('should have an with at least a 8x8 cells', () => {
            finder.createGridSquare(10)
            const gridSquare = finder.gridSquare;

            expect(gridSquare.length).toBeGreaterThanOrEqual(64);
        });
    })

    describe.skip('use cases', () => {
        test('From 1 to 1', () => {
            expect(finder.getMinimumMoves(1, 1)).toBe(0);
        });

        test('From 19 to 53', () => {
            const finder = new PathFinder();
            expect(finder.getMinimumMoves(19, 53)).toBe(2);
        });

        test('From 1 to 64', () => {
            const finder = new PathFinder();
            expect(finder.getMinimumMoves(1, 64)).toBe(6);
        });

        test('From 50 to 20', () => {
            const finder = new PathFinder();
            expect(finder.getMinimumMoves(50, 20)).toBe(2);
        });

        test('From 50 to 51', () => {
            const finder = new PathFinder();
            expect(finder.getMinimumMoves(50, 51)).toBe(3);
        });
    })
});
