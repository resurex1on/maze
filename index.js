const initialMaze = [
  ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
  ['#', '+', '+', '+', '#', '+', '+', '+', '#'],
  ['#', '+', '#', '+', '#', '+', '#', '+', '#'],
  ['#', '+', '#', '+', '0', '+', '#', '+', '+'],
  ['#', '#', '#', '+', '#', '#', '#', '#', '#'],
  ['#', '#', '+', '+', '#', '#', '#', '#', '#'],
  ['#', '#', '+', '#', '#', '#', '#', '#', '#'],
  ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
]

const Symbols = {
  Player: '0',
  Wall: '#',
  Path: '+',
  Visited: '-'
}

function printMaze(maze) {
  for (let i = 0; i < maze.length; i++) {
    let result = ''
    for (let j = 0; j < maze[i].length; j++) {
      const element = maze[i][j];
      result += element;
    }
    console.log(result);
  }
  console.log('------------------------')
}


function walk(maze, x, y, currentDir) {
  // нашли выход
  if (x < 0 || y < 0 || x >= maze[y].length || y >= maze.length) {
    return [];
  }

  // если стена или уже посещенная ячейка
  if (maze[y][x] === Symbols.Wall || maze[y][x] === Symbols.Visited) {
    return null;
  }

  // если игрок или путь
  if (maze[y][x] === Symbols.Path || maze[y][x] === Symbols.Player) {
    // помечаем что посетили
    maze[y][x] = Symbols.Visited;

    const solution =
      walk(maze, x - 1, y, 'left') ||
      walk(maze, x, y - 1, 'top') ||
      walk(maze, x, y + 1, 'bottom') ||
      walk(maze, x + 1, y, 'right');

    // мы находимся не в начальной позиции и есть решение, то возвращаем его
    if (currentDir && solution) {
      return [currentDir, ...solution]
    }

    // в противном случае, возвращаем решение (null или же путь)
    return solution

  }

  return null;
}

/**
 * 
 * @param {string[][]} maze 
 */
function solveMaze(maze) {
  const playerY = maze.findIndex((row) => row.includes(Symbols.Player))
  const playerX = maze[playerY].indexOf(Symbols.Player);

  return walk(maze, playerX, playerY)
}

const turns = solveMaze(initialMaze)

console.log(turns)
