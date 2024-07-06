const PathFinder = require('./pathFinder');


describe('Pathfinder', () => {
    let finder;

    function mockGetMinimumMoves() {
        return (start, end, expectedResult) => {
            const minimumMoves = finder.getMinimumMoves(start, end);
            expect(minimumMoves).toBe(expectedResult);
        };
    }

    beforeEach(() => {
        finder = new PathFinder();
    })

    describe('TDD', () => {
        describe('build board', () => {
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
        });

        describe('knight moves', () => {

            test.each`
  position    | target    | expected
  ${1} | ${1} | ${{"cellIndex": 0, "rowIndex": 0}}
  ${5} | ${1} | ${{"cellIndex": 4, "rowIndex": 0}}
  ${24} | ${1} | ${{"cellIndex": 7, "rowIndex": 2}}
  ${64} | ${1} | ${{"cellIndex": 7, "rowIndex": 7}}
`("should start at the given position : $position", ({position, target, expected}) => {
                finder.getMinimumMoves(position, target);

                expect(finder.getRowAndCellIndexes(position)).toStrictEqual(expected);


            })

            test("should have a collection of moves", () => {
                const knightMoves = finder.knightMoves;
                const expectecMap = new Map();

                expectecMap.set("up right", {y: -2, x: 1})
                expectecMap.set("up left", {y: -2, x: -1})
                expectecMap.set("right up", {x: 2, y: -1})
                expectecMap.set("right down", {x: 2, y: 1})
                expectecMap.set("bottom right", {y: 2, x: 1})
                expectecMap.set("bottom left", {y: 2, x: -1})
                expectecMap.set("left up", {x: -2, y: -1})
                expectecMap.set("left bottom", {x: -2, y: 1})

                expect(knightMoves).toStrictEqual(expectecMap);
            })

        });

        describe('BFR algo', () => {

            beforeEach(() => {
                finder.buildBoard(3);
                /*
                  [
                   [ 1, 2, 3 ],
                   [ 4, 5, 6 ],
                   [ 7, 8, 9 ]
                  ],
                * */
            })

            test.each([
                [1, 4, 3],
                [1, 6, 1],
                [1, 5, 0]
            ])("should a path length of 3", mockGetMinimumMoves())


        })

    })

    describe('use cases', () => {
        test.each([
            [1, 1, 0],
            [19, 53, 2],
            [1, 64, 6],
            [50, 20, 2],
            [50, 51, 3],
        ])('minimum move from %i to %i should be %i', mockGetMinimumMoves());

    })
});
