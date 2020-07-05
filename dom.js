(function () {
  var height = 40; // Array height
  var width = 100; // Array width
  var life = new Life(height, width);
  var tick = 1000 // refresh rate
  var generation, newGeneration = [];

  newGeneration = life.arrayClone(life.seed);
  start();

  function start() {
    window.setInterval(function () {
      generation = life.createGeneration(newGeneration);
      newGeneration = life.arrayClone(generation);

      display(newGeneration);
    }, tick);
  }

  function display(seed) {
    var newSeedformat = life.arrayClone(seed);

    var printThis = "";
    for (var i = 0; i < newSeedformat.length; i++) {
      printThis += "<br>"
      var row = newSeedformat[i];
      for (var j = 0; j < row.length; j++) {
        if (newSeedformat[i][j] === 1) {
          printThis += "<span class='square-cell'>&nbsp;</span>"
        } else {
          printThis += "<span class='square-empty'>&nbsp;</span>"
        }
      }
    }

    document.getElementById("display").innerHTML = printThis;
  }
})();
