const PathFinder = require('./pathFinder');

describe('Pathfinder', () => {
    let finder;

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
            test.each([{
                position: 1, target: 1, expected: {"cellIndex": 0, "rowIndex": 0}
            }, {
                position: 5,
                target: 1,
                expected: {"cellIndex": 4, "rowIndex": 0}
            }, {position: 24, target: 1, expected: {"cellIndex": 7, "rowIndex": 2}}, {
                position: 64,
                target: 1,
                expected: {"cellIndex": 7, "rowIndex": 7}

            }])("should start at the given position", ({
                                                           position, target, expected
                                                       }) => {

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
            test("should start from cell 1 then have 6 and 8 has next cells", () => {
                /*
                  [
                   [ 1, 2, 3 ],
                   [ 4, 5, 6 ],
                   [ 7, 8, 9 ]
                  ],
                * */
                finder.buildBoard(3);
                finder.getMinimumMoves(1, 6);

                expect(Array.from(finder.graph.values())[0]).toStrictEqual(new Set([6, 8]));

            })

            test("should start from cell 2 then have 9 and 7 has next cells", () => {
                const secondKey = {"2": [9, 7]}

                finder.buildBoard(3);
                finder.getMinimumMoves(2, 9);

                expect(Array.from(finder.graph.values())[0]).toStrictEqual(new Set([9, 7]));
            })

            test("should start from cell 5 then have 9 and 7 has next cells", () => {

                finder.buildBoard(3);
                finder.getMinimumMoves(5, 9);

                expect(Array.from(finder.graph.keys())[0]).toBeUndefined();
            })

            test("should construct graph", () => {

                finder.buildBoard(3);
                finder.getMinimumMoves(1, 6);

                expect(Array.from(finder.graph.entries())).toStrictEqual([
                    [1, new Set([6, 8])],
                    [6, new Set([7])],
                    [7, new Set([2])],
                    [2, new Set([9])],
                    [9, new Set([4])],
                    [4, new Set([3])],
                    [3, new Set([8])],
                ]);
            })

            test("should a path length of 5", () => {
                finder.buildBoard(3);
                finder.getMinimumMoves(1, 4);
                /*
                  [
                   [ 1, 2, 3 ],
                   [ 4, 5, 6 ],
                   [ 7, 8, 9 ]
                  ],
                * */

                expect(finder.getMinimumMoves(1, 4)).toBe(3);
            })

            test("should a path length of 5", () => {
                finder.buildBoard(3);
                /*
                  [
                   [ 1, 2, 3 ],
                   [ 4, 5, 6 ],
                   [ 7, 8, 9 ]
                  ],
                * */

                expect(finder.getMinimumMoves(1, 6)).toBe(1);
            })

            test("should a path length of 5", () => {
                finder.buildBoard(3);
                /*
                  [
                   [ 1, 2, 3 ],
                   [ 4, 5, 6 ],
                   [ 7, 8, 9 ]
                  ],
                * */

                expect(finder.getMinimumMoves(1, 5)).toBe(0);
            })


            /*
            * 1--
            *   6--
            *     7--
            *       2--
            *         9--
            *           4--
            *   8--
            *     3--
            *       4--
            *         9--
            *           2--
            *             7--
            *               6--
            *
            * */

        })

    })

    describe('use cases', () => {
        test('From 1 to 1', () => {
            expect(finder.getMinimumMoves(1, 1)).toBe(0);
        });

        test('From 19 to 53', () => {
            expect(finder.getMinimumMoves(19, 53)).toBe(2);
        });

        test('From 1 to 64', () => {
            expect(finder.getMinimumMoves(1, 64)).toBe(6);
        });

        test('From 50 to 20', () => {
            expect(finder.getMinimumMoves(50, 20)).toBe(2);
        });

        test('From 50 to 51', () => {
            expect(finder.getMinimumMoves(50, 51)).toBe(3);
        });
    })
});
