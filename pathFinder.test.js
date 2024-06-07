const PathFinder = require('./pathFinder');

test('From 1 to 1', () => {
    const finder = new PathFinder();
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

// Ajout d'un test avec une taille d'échiquier de 10
test('From 19 to 53', () => {
    const finder = new PathFinder(10);
    expect(finder.getMinimumMoves(19, 53)).toBe(4);
});

// Ajout d'un test avec une taille d'échiquier de 20
test('From 50 to 20', () => {
    const finder = new PathFinder(20);
    expect(finder.getMinimumMoves(50, 20)).toBe(6);
});