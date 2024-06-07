/* Recherche d'une solution sans passer par la programmation orientée objet. 
Je l'ai ensuite adapatée dans pathFinder.js pour correspondre au besoin de passer par la POO */

// Fonction de vérification des coordonnées par rapport à la taille de l'échiquier
function validation(x, y, boardSize) {
  return x >= 0 && y >= 0 && x < boardSize && y < boardSize;
}

// Fonction de conversion de la position en coordonnées, exemple : 23, 8 => [2, 6]
function positionToCoordinates(position, boardSize) {
  const x = Math.floor((position - 1) / boardSize);
  const y = (position - 1) - x * boardSize;
  return [x, y];
}

// Fonction de conversion des coordonnées en position, exemple : [2, 6], 8 => 23
function coordinatesToPosition(x, y, boardSize) {
  return x * boardSize + y + 1;
}

// Fonction de recherche du nombre minimum de mouvements pour atteindre la position cible
function getMinimumMoves(start, target, boardSize) {
  // Si la position de départ est la même que la position cible, on retourne 0
  if (start === target) return 0;

  // On récupère les coordonnées de départ et d'arrivée
  const [startX, startY] = positionToCoordinates(start, boardSize);
  const [targetX, targetY] = positionToCoordinates(target, boardSize);

  // On définit les mouvements possibles du cavalier
  const knightMoves = [
      [2, 1], [1, 2], [-1, 2], [-2, 1],
      [-2, -1], [-1, -2], [1, -2], [2, -1]
  ];

  // On initialise la file de priorité avec la position de départ et le nombre de mouvements
  const queue = [[startX, startY, 0]];
  // On initialise un tableau pour stocker les positions visitées en assignant true à la position de départ
  const visited = new Array(boardSize * boardSize).fill(false);
    visited[start - 1] = true;

  // On parcourt la file de priorité tant qu'elle n'est pas vide
  while (queue.length > 0) {
      // On récupère les coordonnées et le nombre de mouvements du cavalier
      const [x, y, movesCount] = queue.shift();

      // On parcourt les mouvements possibles du cavalier
      for (const [dx, dy] of knightMoves) {

          // On calcule les nouvelles coordonnées
          const newX = x + dx;
          const newY = y + dy;
          // On convertit les nouvelles coordonnées en position
          const newPosition = coordinatesToPosition(newX, newY, boardSize);

          // Si les nouvelles coordonnées correspondent aux coordonnées de la cible, on retourne le nombre de mouvements totaux + 1
          if (newX === targetX && newY === targetY) {
              return movesCount + 1;
          }

          // Si les nouvelles coordonnées sont valides et que la position n'a pas été visitée, on ajoute les nouvelles coordonnées à la file de priorité et on marque la position comme visitée
          if (validation(newX, newY, boardSize) && !visited[newPosition - 1]) {
              queue.push([newX, newY, movesCount + 1]);
              visited[newPosition - 1] = true;
          }
      }
  }

  return -1; // Si aucune solution n'est trouvée (ce qui ne devrait pas arriver)
}

const size = 8;
console.log(getMinimumMoves(1, 1, size)); // 0
console.log(getMinimumMoves(19, 53, size)); // 2
