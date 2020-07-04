function Life () {
  this.seed = [
    [0, 0, 0, 0, 0],
    [1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];
}

Life.prototype.start = function() {
  var seed, newSeed = [];
  seed = this.seed;

  for (;;) {
    newSeed = this.createGeneration(seed);
    seed = newSeed;
    console.log(seed)
  }

}

Life.prototype.createGeneration = function(seed) {
  var i, j = 0;
  var aliveNeighbours = 0;
  var newSeed = this.arrayClone(seed);

  for (i = 0; i < seed.length; i++) {
    var row = seed[i];
    for (j = 0; j < row.length; j++) {
      aliveNeighbours = this.aliveNeighboursCount(seed, i, j);
      if (this.isAlive(seed[i][j]) && (aliveNeighbours < 2 || aliveNeighbours > 3)) {
        newSeed[i][j] = 0;
      }
      if (this.isDead(seed[i][j]) && aliveNeighbours === 3) {
        newSeed[i][j] = 1;
      }
    }
  }
  return newSeed
}

Life.prototype.aliveNeighboursCount = function (seed, positionY, positionX) {
  var counter = 0;
  var top    = seed[positionY - 1];
  var bottom = seed[positionY + 1];

  if (top != undefined) {
    if (this.isAlive(top[positionX - 1])) { counter += 1 }
    if (this.isAlive(top[positionX]))     { counter += 1 }
    if (this.isAlive(top[positionX + 1])) { counter += 1 }
  }

  if (bottom != undefined) {
    if (this.isAlive(bottom[positionX - 1])) { counter += 1 }
    if (this.isAlive(bottom[positionX]))     { counter += 1 }
    if (this.isAlive(bottom[positionX + 1])) { counter += 1 }
  }

  if (this.isAlive(seed[positionY][positionX - 1]))  { counter += 1 };
  if (this.isAlive(seed[positionY][positionX + 1]))  { counter += 1 };

  return counter;
}

Life.prototype.isAlive = function(value) {
  return value === 1;
}

Life.prototype.isDead = function (value) {
  return value === 0;
}

Life.prototype.arrayClone = function(array) {
  var newArray = []

  for (var i = 0; i < array.length; i++)
    newArray[i] = array[i].slice();

  return newArray;
}

var life = new Life();
life.start();
