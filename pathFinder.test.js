const PathFinder = require('./pathFinder');

describe('Pathfinder', () => {
    let finder;

    beforeEach(() => {
        finder = new PathFinder();
    })

    describe('TDD', () => {
        test('should have a board property', () => {
            expect(finder).toHaveProperty("board");
        });

        test('should have an board defined', () => {
            expect(finder.board).toBeDefined();
        });

        test('should have an with at least a 8x8 cells', () => {
            finder.buildBoard(10)

            expect(finder.board.length).toBeGreaterThanOrEqual(8);
        });

        test('should be a 2 dimensional array', () => {
            const r = finder.board.filter((row) => row.length !== 8);
            expect(r).toHaveLength(0);
            expect(finder.board).toHaveLength(8);
        })


        test('each cell should be unique and range from 1 to 64 for an 8x8 board', () => {
            const flatBoard = finder.board.flat()
            expect(Math.min(...flatBoard)).toBe(1);
            expect(Math.max(...flatBoard)).toBe(64);
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
