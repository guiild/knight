class PathFinder {
    getMinimumMoves = (position, target, N = 8) => {
        const strat = [Math.floor((position - 1) / N), (position - 1) % N];
        const end = [Math.floor((target - 1) / N), (target - 1) % N];

        // Tous les mouvements possibles du cavalier
        const moves = [
            [2, 1], [2, -1], [-2, 1], [-2, -1],
            [1, 2], [1, -2], [-1, 2], [-1, -2]
        ]

        const queue = [[...strat, 0]];  // x, y, moves
        const visited = new Set();
        visited.add(strat.toString());

        while (queue.length > 0){
            const [x, y, dist] = queue.shift();

            // Si on est arrivé à la destination
            if (x === end[0] && y === end[1]){
                return dist;
            }

            // Parcours tous les mouvements possibles
            for (let [dx, dy] of moves){
                const nx = x + dx;
                const ny = y + dy;

                if (nx >= 0 && nx < N && ny >= 0 && ny < N && !visited.has([nx, ny].toString())){
                    visited.add([nx, ny].toString());
                    queue.push([nx, ny, dist + 1]);
                }
            }
        }

        return -1;
    }
}

module.exports = PathFinder;