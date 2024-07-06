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
            test.each([{position: 1, target: 1, expected: [0, 0]}, {
                position: 5,
                target: 1,
                expected: [0, 4]
            }, {position: 24, target: 1, expected: [2, 7]}, {
                position: 64,
                target: 1,
                expected: [7, 7]
            }])("should start at the given position", ({
                                                           position, target, expected
                                                       }) => {

                finder.getMinimumMoves(position, target);

                expect(finder.knightPosition).toStrictEqual(expected);


            })

            test("should have a collection of moves", () => {
                const knightMoves = finder.knightMoves;

                expect(knightMoves).toStrictEqual([[2, 1], [2, -1], [-2, 1], [-2, -1]])
            })

            test.each([{position: 1, target: 1, expected: [0, 0]}, {
                position: 5,
                target: 1,
                expected: [0, 0]
            }, {position: 24, target: 1, expected: [0, 0]}, {position: 64, target: 1, expected: [0, 0]}, {
                position: 64,
                target: 42,
                expected: [5, 1]
            },])("should identify where is the cell target", ({
                                                                  position, target, expected
                                                              }) => {
                finder.getMinimumMoves(position, target)

                expect(finder.knightTarget).toStrictEqual(expected)
            })
        });

        describe('BFR algo', () => {
            test("should start from cell 1 then have 6 and 8 has next cells", () => {
                const firstKey = {"1": [6, 8]}
                /*
                  [
                   [ 1, 2, 3 ],
                   [ 4, 5, 6 ],
                   [ 7, 8, 9 ]
                  ],
                * */
                finder.buildBoard(3);
                finder.getMinimumMoves(1, 6);

                expect(Array.from(finder.graph.keys())[0]).toStrictEqual(firstKey);

            })

            test("should start from cell 2 then have 9 and 7 has next cells", () => {
                const secondKey = {"2": [9, 7]}

                finder.buildBoard(3);
                finder.getMinimumMoves(2, 9);

                expect(Array.from(finder.graph.keys())[0]).toStrictEqual(secondKey);
            })

            test.skip("should construct graph", () => {

                finder.buildBoard(3);
                finder.getMinimumMoves(1, 6);

                expect(finder.graph).toStrictEqual({
                    1: [6, 8], 6: [7], 8: [3], 7: [2], 3: [4], 4: [9], 9: [],
                });
            })


        })

    })

    describe.skip('use cases', () => {
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

        test('should handle invalid inputs', () => {

            // Test case 6: Invalid initial position (0)
            expect(() => finder.getMinimumMovesBFS(0, 1)).toThrow('Invalid initial position');

            // Test case 7: Invalid target position (65)
            expect(() => finder.getMinimumMovesBFS(1, 65)).toThrow('Invalid target position');

            // Test case 8: Invalid initial and target positions (0, 65)
            expect(() => finder.getMinimumMovesBFS(0, 65)).toThrow('Invalid initial position');
        });
    })
});
