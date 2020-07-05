function Life (y, x) {
  var seed = this._createSeed([y, x]);

  this.height = y;
  this.width = x;
  for(var i = 0; i < 15; i++) {
    seed = this._insertRandomCell(seed, this._gliderCell(), this._randomRow(), this._randomColumn());
    seed = this._insertRandomCell(seed, this._loafCell(), this._randomRow(), this._randomColumn());
    seed = this._insertRandomCell(seed, this._straightCell(), this._randomRow(), this._randomColumn());
  }
  this.seed = seed;
}

Life.prototype.createGeneration = function (seed) {
  var newSeed = this.arrayClone(seed);

  for (var i = 0; i < seed.length; i++) {
    var row = seed[i];
    for (var j = 0; j < row.length; j++) {
      var aliveNeighbours = this.aliveNeighboursCount(seed, i, j);
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

Life.prototype.arrayClone = function (array) {
  var newArray = []

  for (var i = 0; i < array.length; i++)
    newArray[i] = array[i].slice();

  return newArray;
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

Life.prototype.isAlive = function (value) {
  return value === 1;
}

Life.prototype.isDead = function (value) {
  return value === 0;
}

Life.prototype._createSeed = function (dimensions) {
  var array = [];

  for (var i = 0; i < dimensions[0]; ++i) {
    array.push(dimensions.length == 1 ? 0 : this._createSeed(dimensions.slice(1)));
  }

  return array;
}

Life.prototype._insertRandomCell = function (seed, cell, randomRow, randomColumn) {
  var newSeed = this.arrayClone(seed);
  var maxCelllength = this._loafCell().length;

  if (randomRow > (this.height - maxCelllength)) { randomRow = randomRow - maxCelllength }
  if (randomColumn > (this.width - maxCelllength)) { randomColumn = randomColumn - maxCelllength }

  for (var i = 0; i < cell.length; i++) {
    var row = cell[i];
    for(var j = 0; j < row.length; j++) {
      newSeed[randomRow + i][randomColumn + j] = cell[i][j];
    }
  };

  return newSeed;
}

Life.prototype._randomRow = function () {
  return Math.floor(Math.random() * this.height);
}

Life.prototype._randomColumn = function () {
  return Math.floor(Math.random() * this.width);
}

Life.prototype._gliderCell = function () {
  var cell = [
    [0, 1, 0],
    [0, 0, 1],
    [1, 1, 1]
  ]

  return cell
}

Life.prototype._straightCell = function () {
  var cell = [
    [1, 1, 1]
  ];

  return cell
}

Life.prototype._loafCell = function () {
  var cell = [
    [0, 0, 1, 0],
    [0, 1, 0, 1],
    [1, 0, 0, 1],
    [0, 1, 1, 0]
  ]

  return cell
}
