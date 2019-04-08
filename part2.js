// 152 is the answer

function checkPaths(arr) {
  var lastX = arr[arr.length - 1][1];
  var lastY = arr[arr.length - 1][0];
  var penultimateX = arr[arr.length - 2][1];
  var penultimateY = arr[arr.length - 2][0];

  for (var i = 1; i < arr.length - 2; i += 2) {
    var min = Math.min(arr[i][1], arr[i - 1][1]);
    var max = Math.max(arr[i][1], arr[i - 1][1]);
    if (
      min <= lastX &&
      lastX <= max &&
      (Math.min(penultimateY, lastY) <= arr[i][0] &&
        arr[i][0] <= Math.max(penultimateY, lastY))
    ) {
      return [arr[i][0], lastX];
    }
  }
  return false;
}

function directions(input) {
  input = input.split(", ");
  var coords = [[0, 0]];
  var facing = "N";
  var bearings = ["N", "E", "S", "W"];
  var bearingIndex = 0;
  var res = [];
  var ans = 0;

  for (var i = 0; i < input.length; i++) {
    input[i][0] === "R" ? bearingIndex++ : bearingIndex--;
    if (bearingIndex > 3) {
      bearingIndex = 0;
    } else if (bearingIndex < 0) {
      bearingIndex = 3;
    }
    facing = bearings[bearingIndex];
    var x = coords[coords.length - 1][1];
    var y = coords[coords.length - 1][0];
    if (facing === "N") y -= Number(input[i].slice(1));
    if (facing === "E") x += Number(input[i].slice(1));
    if (facing === "S") y += Number(input[i].slice(1));
    if (facing === "W") x -= Number(input[i].slice(1));
    coords.push([y, x]);

    if (coords.length > 3 && coords.length % 2 !== 0) {
      var res = checkPaths(coords);
      if (res) {
        ans = Math.abs(res[0]) + Math.abs(res[1]);
        return ans;
      }
    }
  }
}

directions(input);
