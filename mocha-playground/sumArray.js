// Write a function sum that accepts an array of values returns a Promise that resolves the sum of the values in the array. The array may contain numbers and strings. If the strings can safely be converted to numbers then use the converted numbers as part of the sum, otherwise, ignore them. sum([1, '2', 'a', 3]) should resolve to 6.

//This correctly returns a Promise that will resolve to the sum if the array only contained numbers.
const sum = (arr) => {
  return new Promise((resolve, reject) => {
    const answer = arr.reduce((acc, curr) => {
      // return acc + curr;
      //modifying to check type in fx
      const num = parseFloat(curr);
      return acc + (isNan(num) ? 0 : num);
    }, 0);
    resolve(answer);
  })
}

module.exports = sum;