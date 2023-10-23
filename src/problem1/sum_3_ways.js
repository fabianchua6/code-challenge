// recursively
var sum_to_n_a = function (n) {
  let result = 0;
  if (n < 0) {
    return 0;
  }

  for (let i = 0; i <= n; i++) {
    result += i;
  }
  return result;
};

// iteratively
var sum_to_n_b = function (n) {
  // base case
  if (n < 0) {
    return 0;
  }
  // recursive case
  return n + sum_to_n_b(n - 1);
};

// primary school formula n(n+1)/2
var sum_to_n_c = function (n) {
  return n < 0 ? 0 : (n * (n + 1)) / 2;
};

// for test
module.exports = { sum_to_n_a, sum_to_n_b, sum_to_n_c };
