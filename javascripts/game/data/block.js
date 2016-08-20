var single1 = function() {
  return [0, 0, 1, 0, 0]
}

var single2 = function() {
  return [0, 1, 1, 0, 0]
}

var single3 = function() {
  return [0, 1, 1, 1, 0]
}

var double1 = function() {
  return [0, 1, 2, 1, 0]
}

var double2 = function() {
  return [0, 1, 2, 2, 1, 0]
}

var double3 = function() {
  return [0, 1, 1, 2, 2, 2, 2, 0]
}

var threble1 = function() {
  return [0, 1, 2, 3, 2, 0]
}

var threble2 = function() {
  return [0, 1, 2, 3, 3, 3]
}

var threble3 = function() {
  return [0, 1, 2, 1, 3, 3, 2, 3, 1, 3]
}

module.exports = {
  single1: single1,
  single2: single2,
  single3: single3,
  double1: double1,
  double2: double2,
  double3: double3,
  threble1: threble1,
  threble2: threble2,
  threble3: threble3
}
