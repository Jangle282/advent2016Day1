// 353 is the answer

function directions(input) {
  input = input.split(", ");
  var facing = "N";
  var bearings = ["N", "E", "S", "W"];
  var bearingIndex = 0;
  var x = 0;
  var y = 0;

  for (var i = 0; i < input.length; i++) {
    input[i][0] === "R" ? bearingIndex++ : bearingIndex--;
    if (bearingIndex > 3) bearingIndex = 0;
    if (bearingIndex < 0) bearingIndex = 3;
    facing = bearings[bearingIndex];

    if (facing === "N") y -= Number(input[i].slice(1));
    if (facing === "E") x += Number(input[i].slice(1));
    if (facing === "S") y += Number(input[i].slice(1));
    if (facing === "W") x -= Number(input[i].slice(1));
  }
  return Math.abs(y) + Math.abs(x);
}

directions(input);
