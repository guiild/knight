class PathFinder {
    constructor(boardSize) {
      this.boardSize = boardSize || 8;
      this.knightMoves = [
        [2, 1], [1, 2], [-1, 2], [-2, 1],
        [-2, -1], [-1, -2], [1, -2], [2, -1]
      ];
    }
  
    // Méthode de vérification des coordonnées par rapport à la taille de l'échiquier
    validation(x, y) {
      return x >= 0 && y >= 0 && x < this.boardSize && y < this.boardSize;
    }
  
    // Méthode de conversion de la position en coordonnées
    positionToCoordinates(position) {
      const x = Math.floor((position - 1) / this.boardSize);
      const y = (position - 1) - x * this.boardSize;
      return [x, y];
    }
  
    // Méthode de conversion des coordonnées en position
    coordinatesToPosition(x, y) {
      return x * this.boardSize + y + 1;
    }
  
    // Méthode de recherche du nombre minimum de mouvements pour atteindre la position cible
    getMinimumMoves(start, target) {
      if (start === target) return 0;
  
      const [startX, startY] = this.positionToCoordinates(start);
      const [targetX, targetY] = this.positionToCoordinates(target);
  
      const queue = [[startX, startY, 0]];
      const visited = new Array(this.boardSize * this.boardSize).fill(false);
      visited[start - 1] = true;
  
      while (queue.length > 0) {
        const [x, y, movesCount] = queue.shift();
  
        for (const [dx, dy] of this.knightMoves) {
          const newX = x + dx;
          const newY = y + dy;
          const newPosition = this.coordinatesToPosition(newX, newY);
  
          if (newX === targetX && newY === targetY) {
            return movesCount + 1;
          }
  
          if (this.validation(newX, newY) && !visited[newPosition - 1]) {
            queue.push([newX, newY, movesCount + 1]);
            visited[newPosition - 1] = true;
          }
        }
      }
  
      return -1;
    }
  }
  
  module.exports = PathFinder;
  