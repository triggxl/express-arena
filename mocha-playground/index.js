// Write a function named divide(a, b) that accepts two parameters a and b and returns a/b. If b == 0 throw an error.
function divide (a,b) {
  if(b === 0) {
    throw new Error('Cannot divide by 0');
  }
  return a/b;
}

module.exports = divide;
/*
-D === install as a development dependency
npm uninstall -D [dependency name]
shift command c opens computer terminal 
 */


/*
Steps:
1.) Create a new directory and initialize a new Node project
2.) Add a file index.js for the code for this project.
3.) Write a function named divide(a, b) that accepts two parameters a and b and returns a/b. If b == 0 throw an error.
4.) install the mocha library as a development dependency:
5.) create an npm script for running the tests ("test": "dependency")
6.) create the test directory, make a test file and run a test (npm test)
7.) Modify the index.js file and add an export statement
8.) require it in the test file
*/