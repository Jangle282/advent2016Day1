// 353 is the answer
var input = "L4, R2, R4, L5, L3, L1, R4, R5, R1, R3, L3, L2, L2, R5, R1, L1, L2, R2, R2, L5, R5, R5, L2, R1, R2, L2, L4, L1, R5, R2, R1, R1, L2, L3, R2, L5, L186, L5, L3, R3, L5, R4, R2, L5, R1, R4, L1, L3, R3, R1, L1, R4, R2, L1, L4, R5, L1, R50, L4, R3, R78, R4, R2, L4, R3, L4, R4, L1, R5, L4, R1, L2, R3, L2, R5, R5, L4, L1, L2, R185, L5, R2, R1, L3, R4, L5, R2, R4, L3, R4, L2, L5, R1, R2, L2, L1, L2, R2, L2, R1, L5, L3, L4, L3, L4, L2, L5, L5, R2, L3, L4, R4, R4, R5, L4, L2, R4, L5, R3, R1, L1, R3, L2, R2, R1, R5, L4, R5, L3, R2, R3, R1, R4, L4, R1, R3, L5, L1, L3, R2, R1, R4, L4, R3, L3, R3, R2, L3, L3, R4, L2, R4, L3, L4, R5, R1, L1, R5, R3, R1, R3, R4, L1, R4, R3, R1, L5, L5, L4, R4, R3, L2, R1, R5, L3, R4, R5, L4, L5, R2"

function directions(input) {
  input = input.split(", ");

  var facing = "N";
  var bearings = ["N", "E", "S", "W"];
  var index = 0;
  
  var y = 0;
  var x = 0;

  for (var i = 0; i < input.length; i++) {
    // calculate the direction of travel, N, E, S or W
    input[i][0] === "R" ? index++ : index--;
    if (index > 3) index = 0;
    if (index < 0) index = 3;
    facing = bearings[index];
    // adjust x and y coordinates according to the numberical value and save to global variable
    if (facing === "N") y -= Number(input[i].slice(1));
    if (facing === "E") x += Number(input[i].slice(1));
    if (facing === "S") y += Number(input[i].slice(1));
    if (facing === "W") x -= Number(input[i].slice(1));
  }
  // return the sum of the final coordinates, ignoring negative signs. 
  return Math.abs(y) + Math.abs(x);
}

console.log(directions(input))
