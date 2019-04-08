// 152 is the answer

var input = "L4, R2, R4, L5, L3, L1, R4, R5, R1, R3, L3, L2, L2, R5, R1, L1, L2, R2, R2, L5, R5, R5, L2, R1, R2, L2, L4, L1, R5, R2, R1, R1, L2, L3, R2, L5, L186, L5, L3, R3, L5, R4, R2, L5, R1, R4, L1, L3, R3, R1, L1, R4, R2, L1, L4, R5, L1, R50, L4, R3, R78, R4, R2, L4, R3, L4, R4, L1, R5, L4, R1, L2, R3, L2, R5, R5, L4, L1, L2, R185, L5, R2, R1, L3, R4, L5, R2, R4, L3, R4, L2, L5, R1, R2, L2, L1, L2, R2, L2, R1, L5, L3, L4, L3, L4, L2, L5, L5, R2, L3, L4, R4, R4, R5, L4, L2, R4, L5, R3, R1, L1, R3, L2, R2, R1, R5, L4, R5, L3, R2, R3, R1, R4, L4, R1, R3, L5, L1, L3, R2, R1, R4, L4, R3, L3, R3, R2, L3, L3, R4, L2, R4, L3, L4, R5, R1, L1, R5, R3, R1, R3, R4, L1, R4, R3, R1, L5, L5, L4, R4, R3, L2, R1, R5, L3, R4, R5, L4, L5, R2"

function directions(input) {
  input = input.split(", ");

  // to store history of coordinates
  var coords = [[0, 0]];
  
  var facing = "N";
  var bearings = ["N", "E", "S", "W"];
  var bearingIndex = 0;
  
  var ans = 0;

  for (var i = 0; i < input.length; i++) {
    //calculate direction of travel
    input[i][0] === "R" ? bearingIndex++ : bearingIndex--;
    if (bearingIndex > 3) {
      bearingIndex = 0;
    } else if (bearingIndex < 0) {
      bearingIndex = 3;
    }
    facing = bearings[bearingIndex];

    // previous coordinates saved to y and x
    var y = coords[coords.length - 1][0];
    var x = coords[coords.length - 1][1];

    // next coordinates calculated and pushed into coords array
    if (facing === "N") y -= Number(input[i].slice(1));
    if (facing === "E") x += Number(input[i].slice(1));
    if (facing === "S") y += Number(input[i].slice(1));
    if (facing === "W") x -= Number(input[i].slice(1));
    coords.push([y, x]);
    
    // when the coords array is long enough and has an odd number - call checkpaths function
    if (coords.length > 3 && coords.length % 2 !== 0) {
      var res = checkPaths(coords);
      if (res) { // if checkpaths returns a truthy value (a set of coordinates)
        ans = Math.abs(res[0]) + Math.abs(res[1]); // calculate the number of squares from 0,0 and return
        return ans;
      }
    }
  }
}

function checkPaths(arr) {
  var lastX = arr[arr.length - 1][1];
  var lastY = arr[arr.length - 1][0];
  var penultimateY = arr[arr.length - 2][0];

  // the input has an even length and the fist move changes the x axis. 
  // this means the final move will be to change the y axis
  // to check for a crossing path, must check each x axis move for two things to be true. In one set of coordinates
  // first, that the range of the change in x from the previous coordinate includes the most recent X value
  // second that the most recent change in y includes the y value of the x-direction change 
  for (var i = 1; i < arr.length - 2; i += 2) {
    var min = Math.min(arr[i][1], arr[i - 1][1]);
    var max = Math.max(arr[i][1], arr[i - 1][1]);
    if (
      (min <= lastX && lastX <= max) &&
      (Math.min(penultimateY, lastY) <= arr[i][0] && arr[i][0] <= Math.max(penultimateY, lastY))
    ) {
      // if true return the coordinates of intersection which are the latest X and the Y value of the matching coordinate
      return [arr[i][0], lastX];
    }
  }
  // else return false if no match found
  return false;
}

console.log(directions(input))
